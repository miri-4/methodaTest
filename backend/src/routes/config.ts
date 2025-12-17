import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { Configuration, Status, Transition } from '../types';

const router = Router();

// Get all config data
router.get('/', (req: Request, res: Response) => {
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

// Set initial status
router.put('/initial-status', (req: Request, res: Response) => {
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
router.post('/reset', (req: Request, res: Response) => {
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

export default router;