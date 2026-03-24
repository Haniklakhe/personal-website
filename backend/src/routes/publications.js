import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicationsPath = path.join(__dirname, '../data/publications.json');

// GET all publications
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(publicationsPath, 'utf8');
    const items = JSON.parse(data);
    
    // Sort by year (newest first)
    const sorted = items.sort((a, b) => b.year - a.year);
    
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publications' });
  }
});

// GET single publication
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(publicationsPath, 'utf8');
    const items = JSON.parse(data);
    const item = items.find(p => p.id === req.params.id);
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Publication not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publication' });
  }
});

// GET by year
router.get('/year/:year', async (req, res) => {
  try {
    const data = await fs.readFile(publicationsPath, 'utf8');
    const items = JSON.parse(data);
    const filtered = items.filter(p => p.year === parseInt(req.params.year));
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publications by year' });
  }
});

export default router;
