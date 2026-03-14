import fs from "fs";
import path from "path";

export type TaskItem = { text: string; done: boolean };

export type Note = {
  id: string;
  path: string;
  title: string;
  content: string;
  tags: string[];
  tasks: TaskItem[];
  pinned: boolean;
  date?: string; // YYYY-MM-DD if detected
};

const WORKSPACE_ROOT = path.resolve(process.cwd(), "..");

const SOURCE_PATHS = [
  path.join(WORKSPACE_ROOT, "MEMORY.md"),
  path.join(WORKSPACE_ROOT, "memory"),
  path.join(WORKSPACE_ROOT, "docs")
];

function safeReadFile(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

function listMarkdownFiles(p: string): string[] {
  if (!fs.existsSync(p)) return [];
  const stat = fs.statSync(p);
  if (stat.isFile() && p.endsWith(".md")) return [p];
  if (!stat.isDirectory()) return [];
  const entries = fs.readdirSync(p);
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(p, e);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      files.push(...listMarkdownFiles(full));
    } else if (full.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function extractTitle(content: string, fallback: string): string {
  const lines = content.split(/\r?\n/);
  const h1 = lines.find((l) => l.startsWith("# "));
  if (h1) return h1.replace(/^#\s+/, "").trim();
  return fallback;
}

function extractTags(content: string): string[] {
  const tags = new Set<string>();
  const tagMatches = content.match(/#[a-zA-Z0-9_-]+/g) || [];
  tagMatches.forEach((t) => tags.add(t.replace("#", "")));

  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (line.toLowerCase().startsWith("tags:")) {
      line
        .slice(5)
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => tags.add(t.replace(/^#/, "")));
    }
  }
  return Array.from(tags);
}

function extractTasks(content: string): TaskItem[] {
  const tasks: TaskItem[] = [];
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^- \[( |x|X)\] (.*)$/);
    if (m) tasks.push({ done: m[1].toLowerCase() === "x", text: m[2].trim() });
  }
  return tasks;
}

function detectPinned(content: string): boolean {
  return /\bPINNED\b|📌/i.test(content);
}

function detectDateFromPath(p: string): string | undefined {
  const m = p.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : undefined;
}

export function getIndex(): Note[] {
  const files = SOURCE_PATHS.flatMap(listMarkdownFiles);
  const notes: Note[] = [];

  for (const file of files) {
    const content = safeReadFile(file);
    if (!content) continue;
    const rel = path.relative(WORKSPACE_ROOT, file);
    const title = extractTitle(content, path.basename(file));
    const tags = extractTags(content);
    const tasks = extractTasks(content);
    const pinned = detectPinned(content);
    const date = detectDateFromPath(file);

    notes.push({
      id: rel,
      path: rel,
      title,
      content,
      tags,
      tasks,
      pinned,
      date
    });
  }

  return notes.sort((a, b) => a.path.localeCompare(b.path));
}

export function getDailyNote(notes: Note[], date: string): Note | undefined {
  return notes.find((n) => n.date === date);
}
