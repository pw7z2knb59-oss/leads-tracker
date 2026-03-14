# Second Brain (Local)

Local-only Next.js app that indexes your workspace markdown:
- `MEMORY.md`
- `memory/*.md`
- `docs/**/*.md` (if present)

## Features
- File indexing (server-side, no external APIs)
- Search UI (query + tag filter)
- Tags via `#tag` or `Tags: a, b`
- Tasks via `- [ ]` and `- [x]`
- Pinned items via `PINNED` or 📌
- Daily review (auto-detects `YYYY-MM-DD` in filename)

## Run
```bash
cd /home/kai/.openclaw/workspace/second-brain
npm install
npm run dev
```
Open http://localhost:3000

## Notes
- Indexing is done in `lib/indexer.ts`.
- Workspace root is the parent of this app folder.
