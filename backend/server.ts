import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'config.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS statuses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS transitions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    from_status TEXT NOT NULL,
    to_status TEXT NOT NULL,
    FOREIGN KEY (from_status) REFERENCES statuses(id),
    FOREIGN KEY (to_status) REFERENCES statuses(id)
  );

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

interface Status {
  id: string;
  name: string;
}

interface Transition {
  id: string;
  name: string;
  from: string;
  to: string;
}

interface Configuration {
  statuses: Status[];
  transitions: Transition[];
  initialStatus: string | null;
}

// Get all data
app.get('/api/config', (req: Request, res: Response) => {
  try {
    const statuses = db.prepare('SELECT * FROM statuses').all() as Status[];
    const transitions = db.prepare(
      'SELECT id, name, from_status as "from", to_status as "to" FROM transitions'
    ).all() as Transition[];
    const initialStatusRow = db.prepare(
      'SELECT value FROM config WHERE key = ?'
    ).get('initialStatus') as { value: string } | undefined;

    const config: Configuration = {
      statuses,
      transitions,
      initialStatus: initialStatusRow?.value || null
    };

    res.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add status
app.post('/api/statuses', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name required' });
    return;
  }

  try {
    const id = Date.now().toString();
    db.prepare('INSERT INTO statuses (id, name) VALUES (?, ?)').run(id, name);

    // If first status, set as initial
    const count = db.prepare('SELECT COUNT(*) as count FROM statuses').get() as { count: number };
    if (count.count === 1) {
      db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)').run('initialStatus', id);
    }

    res.json({ id, name });
  } catch (error) {
    console.error('Error adding status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete status
app.delete('/api/statuses/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    db.prepare('DELETE FROM statuses WHERE id = ?').run(id);
    db.prepare('DELETE FROM transitions WHERE from_status = ? OR to_status = ?').run(id, id);

    // Update initial status if needed
    const initialStatusRow = db.prepare(
      'SELECT value FROM config WHERE key = ?'
    ).get('initialStatus') as { value: string } | undefined;

    if (initialStatusRow?.value === id) {
      const firstStatus = db.prepare('SELECT id FROM statuses LIMIT 1').get() as { id: string } | undefined;
      if (firstStatus) {
        db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)').run('initialStatus', firstStatus.id);
      } else {
        db.prepare('DELETE FROM config WHERE key = ?').run('initialStatus');
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add transition
app.post('/api/transitions', (req: Request, res: Response) => {
  const { name, from, to } = req.body;

  if (!name || !from || !to) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  if (from === to) {
    res.status(400).json({ error: 'From and to must be different' });
    return;
  }

  try {
    const id = Date.now().toString();
    db.prepare(
      'INSERT INTO transitions (id, name, from_status, to_status) VALUES (?, ?, ?, ?)'
    ).run(id, name, from, to);

    res.json({ id, name, from, to });
  } catch (error) {
    console.error('Error adding transition:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete transition
app.delete('/api/transitions/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    db.prepare('DELETE FROM transitions WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting transition:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set initial status
app.put('/api/initial-status', (req: Request, res: Response) => {
  const { statusId } = req.body;

  try {
    db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)').run('initialStatus', statusId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error setting initial status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset configuration
app.post('/api/reset', (req: Request, res: Response) => {
  try {
    db.prepare('DELETE FROM statuses').run();
    db.prepare('DELETE FROM transitions').run();
    db.prepare('DELETE FROM config').run();
    res.json({ success: true });
  } catch (error) {
    console.error('Error resetting configuration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${dbPath}`);
});