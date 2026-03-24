import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const experiencePath = path.join(__dirname, '../data/experience.json');

// GET all experience items
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(experiencePath, 'utf8');
    const items = JSON.parse(data);
    
    // Sort by date (current first, then reverse chronological)
    const sorted = items.sort((a, b) => {
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;
      return 0;
    });
    
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// GET single experience item
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(experiencePath, 'utf8');
    const items = JSON.parse(data);
    const item = items.find(e => e.id === req.params.id);
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Experience item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience item' });
  }
});

export default router;
