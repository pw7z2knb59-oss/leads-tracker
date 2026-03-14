import { promises as fs } from "fs";
import path from "path";

export const CSV_PATH =
  process.env.LEADS_CSV_PATH ||
  "/home/kai/.openclaw/workspace/outreach_app/data/leads.csv";

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

export const ALLOWED_STATUS = ["new", "dm_sent", "replied", "call", "closed", "lost"];

export type CsvData = {
  headers: string[];
  rows: Record<string, string>[];
};

const BACKUP_DIR = path.join(path.dirname(CSV_PATH), "backups");

function todayStr(): string {
  const d = new Date(Date.now() + 3 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

async function ensureDirs() {
  await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
  await fs.mkdir(BACKUP_DIR, { recursive: true });
}

async function initCsvIfMissing() {
  try {
    await fs.access(CSV_PATH);
  } catch {
    await fs.writeFile(CSV_PATH, `${REQUIRED_FIELDS.join(",")}\n`, "utf-8");
  }
}

async function dailyBackup() {
  try {
    await fs.access(CSV_PATH);
  } catch {
    return;
  }
  const backupPath = path.join(BACKUP_DIR, `leads_${todayStr()}.csv`);
  try {
    await fs.access(backupPath);
  } catch {
    const data = await fs.readFile(CSV_PATH, "utf-8");
    await fs.writeFile(backupPath, data, "utf-8");
  }
}

function parseCsv(text: string): CsvData {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === ',') {
        row.push(field);
        field = "";
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (ch === '\r') {
        continue;
      } else {
        field += ch;
      }
    }
  }

  row.push(field);
  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  if (rows.length === 0) {
    return { headers: [...REQUIRED_FIELDS], rows: [] };
  }

  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1);
  const mapped = dataRows
    .filter((r) => r.some((cell) => cell !== ""))
    .map((vals) => {
      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = vals[idx] ?? "";
      });
      return rowObj;
    });

  return { headers, rows: mapped };
}

function escapeCsvValue(value: string): string {
  const needsQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function stringifyCsv(data: CsvData): string {
  const { headers, rows } = data;
  const headerLine = headers.map(escapeCsvValue).join(",");
  const lines = rows.map((row) =>
    headers.map((h) => escapeCsvValue(row[h] ?? "")).join(",")
  );
  return [headerLine, ...lines, ""].join("\n");
}

export async function readLeads(): Promise<CsvData> {
  await ensureDirs();
  await initCsvIfMissing();
  await dailyBackup();
  const raw = await fs.readFile(CSV_PATH, "utf-8");
  const data = parseCsv(raw);
  const missing = REQUIRED_FIELDS.filter((k) => !data.headers.includes(k));
  if (missing.length) {
    data.headers = [...data.headers, ...missing];
    data.rows = data.rows.map((r) => {
      const next = { ...r };
      missing.forEach((k) => {
        if (!(k in next)) next[k] = "";
      });
      return next;
    });
    await writeLeads(data);
  }
  return data;
}

export async function writeLeads(data: CsvData) {
  await ensureDirs();
  const tmpPath = `${CSV_PATH}.tmp`;
  const csv = stringifyCsv(data);
  await fs.writeFile(tmpPath, csv, "utf-8");
  await fs.rename(tmpPath, CSV_PATH);
  await dailyBackup();
}

export function normalizeStatus(status: string, outreached: string) {
  let next = status;
  if (!ALLOWED_STATUS.includes(next)) {
    next = "new";
  }
  if (outreached === "yes" && next === "new") {
    next = "dm_sent";
  }
  if (outreached !== "yes" && next === "dm_sent") {
    next = "new";
  }
  return next;
}

export function shouldUpdateLastTouch(
  prev: { status: string; outreached: string; emailed: string },
  next: { status: string; outreached: string; emailed: string }
) {
  return (
    prev.status !== next.status ||
    prev.outreached !== next.outreached ||
    prev.emailed !== next.emailed
  );
}

export function todayKenya(): string {
  return todayStr();
}
