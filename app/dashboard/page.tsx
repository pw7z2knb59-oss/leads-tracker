import DashboardCharts from "./DashboardCharts";
import { readLeads, todayKenya } from "../../lib/leadsCsv";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await readLeads();
  const rows = data.rows;

  const dm_sent = rows.filter((r) => (r.outreached || "").toLowerCase() === "yes" || r.status === "dm_sent").length;
  const emailed = rows.filter((r) => (r.emailed || "").toLowerCase() === "yes").length;
  const replied = rows.filter((r) => r.status === "replied").length;
  const calls = rows.filter((r) => r.status === "call").length;
  const closed = rows.filter((r) => r.status === "closed").length;

  const daily: Record<string, { dm: number; email: number }> = {};
  rows.forEach((r) => {
    const d = r.last_touch || "";
    if (!d) return;
    if (!daily[d]) daily[d] = { dm: 0, email: 0 };
    if ((r.outreached || "").toLowerCase() === "yes" || r.status === "dm_sent") daily[d].dm += 1;
    if ((r.emailed || "").toLowerCase() === "yes") daily[d].email += 1;
  });

  const today = new Date(todayKenya());
  const pastDays = 6;
  const futureDays = 7;
  const start14 = new Date(today);
  start14.setDate(start14.getDate() - pastDays);
  const days14 = Array.from({ length: pastDays + futureDays + 1 }, (_, i) => {
    const d = new Date(start14);
    d.setDate(start14.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 11);
  const start30 = start14 > monthStart ? start14 : monthStart;
  const days30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(start30);
    d.setDate(start30.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  const dm14 = days14.map((d) => daily[d]?.dm || 0);
  const email14 = days14.map((d) => daily[d]?.email || 0);
  const dm30 = days30.map((d) => daily[d]?.dm || 0);
  const email30 = days30.map((d) => daily[d]?.email || 0);
  const target14 = days14.map((_, i) => Math.round(150 * (i + 1) / days14.length));
  const target30 = days30.map((_, i) => Math.round(300 * (i + 1) / 30));

  const replyRate = replied >= 5 ? replied / (dm_sent || 1) : 0.04;
  const callRate = replied >= 5 && calls > 0 ? calls / replied : 0.35;
  const closeRate = calls > 0 ? closed / calls : 0.25;
  const expectedCloses = dm_sent * replyRate * callRate * closeRate;
  const probability = 1 - Math.exp(-expectedCloses);

  return (
    <main>
      <section className="card">
        <div className="section-head">
          <div className="dashboard-hero">
            <h2>Outreach Dashboard</h2>
          </div>
          <a className="btn" href="/leads">Back to Leads</a>
        </div>
        <div className="subtle">14‑day sprint snapshot</div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Probability</h2>
          <span className="subtle">Chance of 1 close this month</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-1px" }}>
            {(probability * 100).toFixed(1)}%
          </div>
          <div className="subtle">Expected closes: {expectedCloses.toFixed(2)}</div>
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Daily Target</h2>
          <span className="subtle">14‑day sprint</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>11 / day</div>
          <div className="subtle">Today: {todayKenya()}</div>
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Totals</h2>
        </div>
        <div className="chips">
          <span className="chip">DMs Sent · {dm_sent}</span>
          <span className="chip">Emailed · {emailed}</span>
          <span className="chip">Replied · {replied}</span>
          <span className="chip">Calls · {calls}</span>
          <span className="chip">Closed · {closed}</span>
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Daily Outreach</h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="subtle" id="rangeLabel">Past 7 + Next 7</span>
            <button className="btn" id="toggleRange" type="button">View full month</button>
          </div>
        </div>
        <div id="chartWrap" className="chart-wrap">
          <div id="chartInner" className="chart-inner">
            <canvas id="dailyChart" height={110}></canvas>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Funnel</h2>
          <span className="subtle">DMs → Replies → Calls → Closes</span>
        </div>
        <canvas id="funnelChart" height={110}></canvas>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Rates</h2>
          <span className="subtle">Using live rates when available, otherwise defaults</span>
        </div>
        <div className="chips">
          <span className="chip">Reply rate · {(replyRate * 100).toFixed(1)}%</span>
          <span className="chip">Call rate · {(callRate * 100).toFixed(1)}%</span>
          <span className="chip">Close rate · {(closeRate * 100).toFixed(1)}%</span>
        </div>
      </section>

      <DashboardCharts
        labels14={days14}
        labels30={days30}
        dm14={dm14}
        email14={email14}
        dm30={dm30}
        email30={email30}
        target14={target14}
        target30={target30}
        funnel={[dm_sent, replied, calls, closed]}
      />
    </main>
  );
}
