import SearchUI from "../../components/SearchUI";
import { getDailyNote, getIndex } from "../../lib/indexer";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Brain() {
  const notes = getIndex();
  const pinned = notes.filter((n) => n.pinned);
  const tasks = notes.flatMap((n) => n.tasks.map((t) => ({ ...t, note: n })));
  const today = todayISO();
  const daily = getDailyNote(notes, today);

  return (
    <main>
      <div className="grid">
        <section className="card">
          <h2>Daily Review</h2>
          <p className="small">Today: {today}</p>
          {daily ? (
            <div className="note">
              <div className="small">{daily.path}</div>
              <h3>{daily.title}</h3>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
                {daily.content.slice(0, 1200)}
                {daily.content.length > 1200 ? "…" : ""}
              </pre>
            </div>
          ) : (
            <p className="small">No daily note found for today.</p>
          )}
        </section>

        <section className="card">
          <h2>Overview</h2>
          <div className="list">
            <div>
              <strong>{notes.length}</strong> notes indexed
            </div>
            <div>
              <strong>{pinned.length}</strong> pinned items
            </div>
            <div>
              <strong>{tasks.length}</strong> total tasks
            </div>
            <div className="small">
              Tip: use <span className="kbd">#tags</span> or <span className="kbd">Tags:</span> in your
              markdown. Add <span className="kbd">PINNED</span> or 📌 to pin.
            </div>
          </div>
        </section>
      </div>

      {pinned.length > 0 && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2>Pinned</h2>
          <div className="list">
            {pinned.map((n) => (
              <div key={n.id}>
                <div className="small">{n.path}</div>
                <strong>{n.title}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {tasks.length > 0 && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2>Tasks</h2>
          <div className="list">
            {tasks.slice(0, 20).map((t, i) => (
              <div key={i} className="small">
                {t.done ? "✅" : "⬜"} {t.text} <span className="small">({t.note.title})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Search</h2>
        <SearchUI notes={notes} />
      </section>
    </main>
  );
}
