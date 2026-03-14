import Link from "next/link";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import LeadCard from "./LeadCard";
import {
  ALLOWED_STATUS,
  normalizeStatus,
  readLeads,
  shouldUpdateLastTouch,
  todayKenya,
  writeLeads,
} from "../../lib/leadsCsv";
import styles from "./leads.module.css";

export const dynamic = "force-dynamic";

const ALLOWED_PRIORITY = ["low", "med", "high"];
const REQUIRED_FIELDS = [
  "name",
  "company",
  "contact",
  "email",
  "status",
  "last_touch",
  "next_followup",
  "priority",
  "offer_amount",
  "notes",
  "outreached",
  "emailed",
  "followers",
  "niche",
];

const TEMPLATE_PATH =
  "/home/kai/.openclaw/workspace/outreach_app/data/dm_template.txt";

const MEGA_BRANDS = new Set([
  "Balenciaga",
  "Bottega Veneta",
  "Burberry",
  "Saint Laurent",
  "Chloé",
  "Prada Eyewear",
  "Gucci Eyewear",
  "CHANEL Eyewear",
  "CELINE Eyewear",
  "Tom Ford Eyewear",
  "Vogue Eyewear",
  "Ray‑Ban",
  "Oakley",
  "Red Bull",
  "Monster Energy",
  "Celsius",
  "PRIME",
  "Ghost Energy",
]);

type LeadRow = Record<string, string> & { _idx: number };

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  dm_sent: "DM Sent",
  replied: "Replied",
  call: "Call",
  closed: "Closed",
  lost: "Lost",
};

const DEFAULT_TEMPLATE = `Rules:
- Choose proof line based on screenshot vibe:
  • Edgy/young/hype → “Blurr Eyewear (UK)”
  • Premium/clean/luxury → “a UK eyewear brand”
- Choose Template A/B/C based on screenshot vibe
- 3 lines max
- Value in line 1
- No em dashes
- No AI mention
- No long personalization

Template A (default):
I can make ads that hook fast.
I run Slate Ads and just did one for Blurr Eyewear (UK) / a UK eyewear brand.
Want 2 hook ideas?

Template B (softer ask):
I can make ads that hook fast.
I run Slate Ads and just did one for Blurr Eyewear (UK) / a UK eyewear brand.
Open to 2 hook ideas?

Template C (negative frame):
I can make ads that hook fast.
I run Slate Ads and just did one for Blurr Eyewear (UK) / a UK eyewear brand.
Would you be against 2 quick hook ideas?`;

function normName(value: string) {
  return (value || "")
    .toLowerCase()
    .split("")
    .filter((ch) => /[a-z0-9]/.test(ch))
    .join("");
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00+03:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function loadTemplate() {
  try {
    const text = await fs.readFile(TEMPLATE_PATH, "utf-8");
    return text.trim() ? text : DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

async function saveTemplate(formData: FormData) {
  "use server";
  const text = String(formData.get("template_text") || "");
  await fs.mkdir("/home/kai/.openclaw/workspace/outreach_app/data", {
    recursive: true,
  });
  await fs.writeFile(TEMPLATE_PATH, text, "utf-8");
  revalidatePath("/leads");
}

async function addLead(formData: FormData) {
  "use server";
  const data = await readLeads();
  const row: Record<string, string> = {};
  const headers = data.headers.length ? data.headers : REQUIRED_FIELDS;
  headers.forEach((key) => {
    row[key] = "";
  });

  headers.forEach((key) => {
    if (key === "outreached" || key === "emailed") return;
    const value = formData.get(key);
    if (typeof value === "string") {
      row[key] = value.trim();
    }
  });

  row.outreached = formData.get("outreached") === "on" ? "yes" : "";
  row.emailed = formData.get("emailed") === "on" ? "yes" : "";

  if (!row.name || !row.company) return;

  const rawStatus = row.status;
  row.status = ALLOWED_STATUS.includes(rawStatus) ? rawStatus : "new";
  row.status = normalizeStatus(row.status, row.outreached);
  row.priority = ALLOWED_PRIORITY.includes(row.priority) ? row.priority : "med";
  row.last_touch = todayKenya();

  data.rows.push(row);
  await writeLeads(data);
  revalidatePath("/leads");
}

async function updateLead(formData: FormData) {
  "use server";
  const idxRaw = formData.get("idx");
  if (idxRaw === null) return;
  const idx = Number(idxRaw);
  if (!Number.isFinite(idx)) return;

  const data = await readLeads();
  if (idx < 0 || idx >= data.rows.length) return;
  const row = { ...data.rows[idx] };

  const prev = {
    status: row.status ?? "",
    outreached: row.outreached ?? "",
    emailed: row.emailed ?? "",
  };

  REQUIRED_FIELDS.forEach((key) => {
    if (key === "last_touch") return;
    const value = formData.get(key);
    if (typeof value === "string") {
      row[key] = value.trim();
    }
  });

  row.outreached = formData.get("outreached") === "on" ? "yes" : "";
  row.emailed = formData.get("emailed") === "on" ? "yes" : "";

  row.status = ALLOWED_STATUS.includes(row.status) ? row.status : "new";
  row.status = normalizeStatus(row.status, row.outreached);
  row.priority = ALLOWED_PRIORITY.includes(row.priority) ? row.priority : "med";

  const next = {
    status: row.status ?? "",
    outreached: row.outreached ?? "",
    emailed: row.emailed ?? "",
  };

  if (shouldUpdateLastTouch(prev, next)) {
    row.last_touch = todayKenya();
  }

  data.rows[idx] = row;
  await writeLeads(data);
  revalidatePath("/leads");
}

async function deleteLead(formData: FormData) {
  "use server";
  const idxRaw = formData.get("idx");
  if (idxRaw === null) return;
  const idx = Number(idxRaw);
  if (!Number.isFinite(idx)) return;
  const data = await readLeads();
  if (idx < 0 || idx >= data.rows.length) return;
  data.rows.splice(idx, 1);
  await writeLeads(data);
  revalidatePath("/leads");
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams?: { view?: string };
}) {
  const data = await readLeads();
  const templateText = await loadTemplate();
  const view = searchParams?.view ?? "all";
  const today = todayKenya();
  const todayDate = parseDate(today);

  const fullRows = data.rows.map((row, idx) => ({ ...row, _idx: idx }));

  const isOverdue = (row: LeadRow) => {
    const nf = parseDate(row.next_followup);
    if (!nf || !todayDate) return false;
    return nf < todayDate && !["closed", "lost"].includes(row.status);
  };

  const isDueToday = (row: LeadRow) => {
    if (!row.next_followup) return false;
    return row.next_followup === today && !["closed", "lost"].includes(row.status);
  };

  const isNew = (row: LeadRow) => row.status === "new";

  const filteredRows = (() => {
    if (view === "overdue") return fullRows.filter((row) => isOverdue(row));
    if (view === "today") return fullRows.filter((row) => isDueToday(row));
    if (view === "new") return fullRows.filter((row) => isNew(row));
    return fullRows;
  })();

  const todayRows = fullRows.filter((row) => isDueToday(row));

  const statusCounts = ALLOWED_STATUS.reduce<Record<string, number>>(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {}
  );
  fullRows.forEach((row) => {
    if (row.status in statusCounts) {
      statusCounts[row.status] += 1;
    }
  });
  const dmSentCount = fullRows.filter(
    (row) => (row.outreached || "").toLowerCase() === "yes" || row.status === "dm_sent"
  ).length;
  statusCounts.dm_sent = dmSentCount;

  const megaNorm = new Set([...MEGA_BRANDS].map((name) => normName(name)));
  const megaRows = fullRows.filter((row) => {
    return (
      megaNorm.has(normName(row.company)) || megaNorm.has(normName(row.name))
    );
  });

  const viewTitle =
    view === "overdue"
      ? "Overdue"
      : view === "today"
      ? "Due Today"
      : view === "new"
      ? "New Leads"
      : "All Leads";

  return (
    <main className={styles.page}>
      <div className={styles.filters}>
        <Link
          href="/leads"
          className={`${styles.filterLink} ${view === "all" ? styles.filterActive : ""}`}
        >
          All
        </Link>
        <Link
          href="/leads?view=overdue"
          className={`${styles.filterLink} ${view === "overdue" ? styles.filterActive : ""}`}
        >
          Overdue
        </Link>
        <Link
          href="/leads?view=today"
          className={`${styles.filterLink} ${view === "today" ? styles.filterActive : ""}`}
        >
          Due Today
        </Link>
        <Link
          href="/leads?view=new"
          className={`${styles.filterLink} ${view === "new" ? styles.filterActive : ""}`}
        >
          New Leads
        </Link>
      </div>

      <section className={styles.card}>
        <div className={styles.sectionHead}>
          <h2>Quick Add</h2>
          <a className={`btn ${styles.ghostButton}`} href="/leads/export">
            Export CSV
          </a>
        </div>
        <form action={addLead}>
          <div className={styles.grid}>
            <input name="name" placeholder="Name" required />
            <input name="company" placeholder="Company" required />
            <input name="contact" placeholder="IG handle" />
            <input name="email" placeholder="Email (if found)" />
            <input name="followers" placeholder="Followers" />
            <input name="niche" placeholder="Niche (e.g., eyewear)" />
            <select name="status" defaultValue="new">
              {ALLOWED_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className={styles.checks}>
              <label>
                <input type="checkbox" name="outreached" />
                Initial outreach
              </label>
              <label>
                <input type="checkbox" name="emailed" />
                Emailed
              </label>
            </div>
            <input name="next_followup" type="date" />
            <select name="priority" defaultValue="med">
              {ALLOWED_PRIORITY.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <input name="offer_amount" placeholder="Offer Amount" />
            <input name="notes" placeholder="Notes" />
          </div>
          <div className={styles.formActions}>
            <button className="btn" type="submit">
              Add Lead
            </button>
          </div>
        </form>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHead}>
          <h2>Today’s Targets</h2>
          <span className={styles.subtle}>Follow-ups due today</span>
        </div>
        {todayRows.length ? (
          <div className={styles.miniList}>
            {todayRows.map((row, idx) => (
              <div key={`${row.company}-${idx}`} className={styles.miniItem}>
                {row.company} — {row.contact}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.subtle}>No follow-ups due today.</div>
        )}
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHead}>
          <h2>Status Pipeline</h2>
          <div className={styles.chips}>
            {ALLOWED_STATUS.map((status) => (
              <span key={status} className={styles.chip}>
                {STATUS_LABELS[status] ?? status} · {statusCounts[status] ?? 0}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.subtle}>
          “New” = not contacted. “DM Sent” = outreach checkbox or status.
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHead}>
          <h2>DM Template</h2>
          <span className={styles.subtle}>Copy/paste</span>
        </div>
        <form action={saveTemplate}>
          <textarea
            className={styles.template}
            name="template_text"
            defaultValue={templateText}
          />
          <div className={styles.formActions}>
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </section>

      {megaRows.length ? (
        <section className={styles.card}>
          <div className={styles.sectionHead}>
            <h2>Mega Brands</h2>
            <span className={styles.subtle}>High-reach, low-odds. Keep small.</span>
          </div>
          <div className={styles.table}>
            <div className={`${styles.row} ${styles.rowHeader}`}>
              <div>Name</div>
              <div>Company</div>
              <div>Contact</div>
              <div>Status</div>
              <div>Last Touch</div>
              <div>Next Follow-up</div>
            </div>
            {megaRows.map((row) => (
              <LeadCard key={`mega-${row._idx}`} row={row} idx={row._idx} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.card}>
        <div className={styles.sectionHead}>
          <h2>{viewTitle}</h2>
          <span className={styles.subtle}>Update inline. Delete is small.</span>
        </div>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.rowHeader}`}>
            <div>Name</div>
            <div>Company</div>
            <div>Contact</div>
            <div>Status</div>
            <div>Last Touch</div>
            <div>Next Follow-up</div>
          </div>
          {filteredRows.map((row) => (
            <LeadCard key={`${row.name}-${row._idx}`} row={row} idx={row._idx} />
          ))}
        </div>
      </section>
    </main>
  );
}
