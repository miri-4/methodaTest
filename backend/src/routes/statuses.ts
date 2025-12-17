import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { Status } from '../types';

const router = Router();

// Get all statuses
router.get('/', (req: Request, res: Response) => {
  try {
    const statuses = db.prepare('SELECT * FROM statuses').all() as Status[];
    res.json(statuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add status
router.post('/', (req: Request, res: Response) => {
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
router.delete('/:id', (req: Request, res: Response) => {
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

export default router;