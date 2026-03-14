import { readLeads, writeLeads } from "../../../lib/leadsCsv";

export async function POST(request: Request) {
  const formData = await request.formData();
  const idxRaw = formData.get("idx");
  if (idxRaw === null) return new Response("bad idx", { status: 400 });
  const idx = Number(idxRaw);
  if (!Number.isFinite(idx)) return new Response("bad idx", { status: 400 });

  const data = await readLeads();
  if (idx < 0 || idx >= data.rows.length) return new Response("out of range", { status: 400 });
  data.rows.splice(idx, 1);
  await writeLeads(data);
  return Response.json({ ok: true });
}
