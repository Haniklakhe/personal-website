import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../data/projects.json');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(projectsPath, 'utf8');
    const items = JSON.parse(data);
    
    // Filter by category if provided
    const category = req.query.category;
    if (category) {
      return res.json(items.filter(p => p.category === category));
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(projectsPath, 'utf8');
    const items = JSON.parse(data);
    const item = items.find(p => p.id === req.params.id);
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

export default router;
