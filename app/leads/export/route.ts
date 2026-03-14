import { promises as fs } from "fs";
import { CSV_PATH } from "../../../lib/leadsCsv";

export async function GET() {
  try {
    const data = await fs.readFile(CSV_PATH, "utf-8");
    return new Response(data, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=leads.csv",
      },
    });
  } catch {
    return new Response("", {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=leads.csv",
      },
    });
  }
}
