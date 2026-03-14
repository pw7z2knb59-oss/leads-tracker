import { readLeads, writeLeads, normalizeStatus, shouldUpdateLastTouch, todayKenya, ALLOWED_STATUS } from "../../../lib/leadsCsv";

export async function POST(request: Request) {
  const formData = await request.formData();
  const idxRaw = formData.get("idx");
  if (idxRaw === null) return new Response("bad idx", { status: 400 });
  const idx = Number(idxRaw);
  if (!Number.isFinite(idx)) return new Response("bad idx", { status: 400 });

  const data = await readLeads();
  if (idx < 0 || idx >= data.rows.length) return new Response("out of range", { status: 400 });
  const row = { ...data.rows[idx] };

  const prev = {
    status: row.status ?? "",
    outreached: row.outreached ?? "",
    emailed: row.emailed ?? "",
  };

  // update only fields present
  for (const [key, value] of formData.entries()) {
    if (key === "idx" || key === "last_touch") continue;
    if (typeof value === "string") row[key] = value.trim();
  }

  row.outreached = formData.get("outreached") === "on" ? "yes" : row.outreached || "";
  row.emailed = formData.get("emailed") === "on" ? "yes" : row.emailed || "";

  const status = row.status || "new";
  row.status = ALLOWED_STATUS.includes(status) ? status : "new";
  row.status = normalizeStatus(row.status, row.outreached);

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
  return Response.json({ ok: true });
}
