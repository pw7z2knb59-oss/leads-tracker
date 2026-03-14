"use client";

import styles from "./leads.module.css";

function buildInstagramUrl(handle: string) {
  const cleaned = (handle || "").replace(/^@/, "").trim();
  if (!cleaned) return "";
  return `https://instagram.com/${cleaned}`;
}

export default function LeadCard({
  row,
  idx,
  actionUrl,
}: {
  row: Record<string, string>;
  idx: number;
  actionUrl?: string;
}) {
  const igUrl = buildInstagramUrl(row.contact || "");
  const autoSave = async (form: HTMLFormElement, target: HTMLInputElement) => {
    const fd = new FormData();
    const idxVal = (form.querySelector('input[name="idx"]') as HTMLInputElement)?.value || "";
    fd.set("idx", idxVal);
    if (target.name === "outreached" && target.checked) fd.set("outreached", "on");
    if (target.name === "emailed" && target.checked) fd.set("emailed", "on");
    await fetch(actionUrl || "/leads/update", { method: "POST", body: fd });
  };

  return (
    <form
      className={`${styles.row} ${styles.leadCard}`}
      action={actionUrl || "/leads/update"}
      onChange={(e) => {
        const form = e.currentTarget as HTMLFormElement;
        const target = e.target as HTMLInputElement;
        if (target?.type === "checkbox") {
          autoSave(form, target);
        }
      }}
    >
      <input type="hidden" name="idx" value={idx} />
      <input name="name" defaultValue={row.name} placeholder="Name" />
      <input name="company" defaultValue={row.company} placeholder="Company" />
      <div className={styles.contactWrap}>
        <input name="contact" defaultValue={row.contact} placeholder="@handle" />
        {igUrl ? (
          <a className={styles.linkBtn} href={igUrl} target="_blank" rel="noreferrer">
            Open IG
          </a>
        ) : (
          <span className={styles.subtle}>Open IG</span>
        )}
      </div>
      <input name="email" defaultValue={row.email} placeholder="Email" />
      <input name="niche" defaultValue={row.niche} placeholder="Niche" />
      <select name="status" defaultValue={row.status || "new"}>
        <option value="new">new</option>
        <option value="dm_sent">dm_sent</option>
        <option value="replied">replied</option>
        <option value="call">call</option>
        <option value="closed">closed</option>
        <option value="lost">lost</option>
      </select>
      <div className={styles.checks}>
        <label>
          <input type="checkbox" name="outreached" defaultChecked={row.outreached === "yes"} />
          Initial outreach
        </label>
        <label>
          <input type="checkbox" name="emailed" defaultChecked={row.emailed === "yes"} />
          Emailed
        </label>
      </div>
      <input name="followers" defaultValue={row.followers} placeholder="Followers" />
      <input name="next_followup" type="date" defaultValue={row.next_followup} />
      <select name="priority" defaultValue={row.priority || "med"}>
        <option value="low">low</option>
        <option value="med">med</option>
        <option value="high">high</option>
      </select>
      <input className={styles.notesField} name="notes" defaultValue={row.notes} placeholder="Notes" />
      <div className={styles.metaRow}>
        <input name="offer_amount" defaultValue={row.offer_amount} placeholder="Offer" />
        <input name="last_touch" defaultValue={row.last_touch} disabled />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className={styles.actions}>
        <button className="btn" type="submit">Update</button>
        <button
          type="button"
          className={`btn ${styles.ghostButton} ${styles.dangerButton}`}
          onClick={async () => {
            const fd = new FormData();
            fd.set("idx", String(idx));
            await fetch(actionUrl ? actionUrl.replace("update", "delete") : "/leads/delete", { method: "POST", body: fd });
            const y = window.scrollY;
            window.location.reload();
            window.scrollTo(0, y);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
