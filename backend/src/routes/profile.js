import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const profilePath = path.join(__dirname, '../data/profile.json');

// GET profile
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(profilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// GET specific profile sections
router.get('/section/:section', async (req, res) => {
  try {
    const data = await fs.readFile(profilePath, 'utf8');
    const profile = JSON.parse(data);
    
    const section = profile[req.params.section];
    if (section) {
      res.json(section);
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

export default router;
