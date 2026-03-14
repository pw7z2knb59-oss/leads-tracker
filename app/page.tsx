export default function Home() {
  return (
    <main>
      <section className="card" style={{ marginBottom: 16 }}>
        <h2>Slate OS</h2>
        <p className="small">Your business hub — everything in one place.</p>
      </section>

      <div className="grid">
        <a className="card link" href="/brain">
          <h3>Second Brain</h3>
          <p className="small">Memories, docs, tasks, daily review.</p>
        </a>
        <a className="card link" href="/leads">
          <h3>Leads</h3>
          <p className="small">Outreach tracker + dashboard.</p>
        </a>
        <div className="card">
          <h3>Ops / Finance</h3>
          <p className="small">Coming soon.</p>
        </div>
        <div className="card">
          <h3>Content</h3>
          <p className="small">Coming soon.</p>
        </div>
        <div className="card">
          <h3>Clients</h3>
          <p className="small">Coming soon.</p>
        </div>
      </div>
    </main>
  );
}
