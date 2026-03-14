"use client";

import { useMemo, useState } from "react";
import type { Note } from "../lib/indexer";

export default function SearchUI({ notes }: { notes: Note[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [showPinned, setShowPinned] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const tags = useMemo(() => {
    const all = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => all.add(t)));
    return Array.from(all).sort();
  }, [notes]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return notes.filter((n) => {
      if (showPinned && !n.pinned) return false;
      if (showTasks && n.tasks.length === 0) return false;
      if (tag && !n.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.path.toLowerCase().includes(q)
      );
    });
  }, [notes, query, tag, showPinned, showTasks]);

  return (
    <div>
      <div className="controls">
        <input
          placeholder="Search notes, tags, tasks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label className="small">
          <input
            type="checkbox"
            checked={showPinned}
            onChange={(e) => setShowPinned(e.target.checked)}
          />{" "}
          Pinned only
        </label>
        <label className="small">
          <input
            type="checkbox"
            checked={showTasks}
            onChange={(e) => setShowTasks(e.target.checked)}
          />{" "}
          With tasks
        </label>
        <span className="small">Results: {filtered.length}</span>
      </div>

      <div className="list">
        {filtered.map((n) => (
          <div key={n.id} className="card">
            <div className="small">{n.path}</div>
            <h3>
              {n.title} {n.pinned && <span className="pin">📌</span>}
            </h3>
            <div className="small">
              {n.tags.map((t) => (
                <span key={t} className="badge tag">
                  #{t}
                </span>
              ))}
            </div>
            {n.tasks.length > 0 && (
              <div className="note">
                <strong>Tasks</strong>
                <ul>
                  {n.tasks.slice(0, 6).map((t, i) => (
                    <li key={i} className="small">
                      {t.done ? "✅" : "⬜"} {t.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <details className="note">
              <summary className="small">Preview</summary>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
                {n.content.slice(0, 1200)}
                {n.content.length > 1200 ? "…" : ""}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
