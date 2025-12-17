import { Router, Request, Response } from 'express';
import { db } from '../database/db';
import { Transition } from '../types';

const router = Router();

// Get all transitions
router.get('/', (req: Request, res: Response) => {
  try {
    const transitions = db.prepare(
      'SELECT id, name, from_status as "from", to_status as "to" FROM transitions'
    ).all() as Transition[];
    res.json(transitions);
  } catch (error) {
    console.error('Error fetching transitions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add transition
router.post('/', (req: Request, res: Response) => {
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
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    db.prepare('DELETE FROM transitions WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting transition:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;