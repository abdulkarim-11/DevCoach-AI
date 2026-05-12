import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL');

// Initialize SQL tables
db.exec(`
  CREATE TABLE IF NOT EXISTS journal_entries (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    hours REAL NOT NULL,
    tasks TEXT NOT NULL,
    good TEXT,
    bad TEXT,
    evidence_link TEXT,
    evidence_desc TEXT
  );

  CREATE TABLE IF NOT EXISTS entry_processes (
    entry_id TEXT NOT NULL,
    process_name TEXT NOT NULL,
    FOREIGN KEY(entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE,
    PRIMARY KEY (entry_id, process_name)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/logs", (req, res) => {
    try {
      const stmt = db.prepare('SELECT * FROM journal_entries ORDER BY date DESC');
      const entries = stmt.all();
      
      const processStmt = db.prepare('SELECT process_name FROM entry_processes WHERE entry_id = ?');
      
      const formattedEntries = entries.map(entry => {
        const processes = processStmt.all(entry.id).map(row => row.process_name);
        return { ...entry, processes };
      });
      
      res.json(formattedEntries);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  app.post("/api/logs", (req, res) => {
    const { id, date, hours, tasks, good, bad, evidence_link, evidence_desc, processes } = req.body;
    
    if (!id || !date || !hours || !tasks) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const insertEntry = db.prepare(`
        INSERT INTO journal_entries (id, date, hours, tasks, good, bad, evidence_link, evidence_desc)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const insertProcess = db.prepare(`
        INSERT INTO entry_processes (entry_id, process_name)
        VALUES (?, ?)
      `);

      const transaction = db.transaction(() => {
        insertEntry.run(id, date, hours, tasks, good || "", bad || "", evidence_link || "", evidence_desc || "");
        if (Array.isArray(processes)) {
          for (const process of processes) {
            insertProcess.run(id, process);
          }
        }
      });

      transaction();
      res.status(201).json({ success: true, id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save log" });
    }
  });

  app.delete("/api/logs/:id", (req, res) => {
    const id = req.params.id;
    try {
      const deleteStmt = db.prepare('DELETE FROM journal_entries WHERE id = ?');
      const result = deleteStmt.run(id);
      
      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Log not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete log" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
