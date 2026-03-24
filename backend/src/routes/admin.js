import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware to verify authentication
const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// LOGIN endpoint
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // For demo: simple password check
    // In production: use proper authentication
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { admin: true, timestamp: Date.now() },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '24h' }
    );
    
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// UPDATE Profile
router.put('/profile', verifyAuth, async (req, res) => {
  try {
    const profilePath = path.join(__dirname, '../data/profile.json');
    const profile = { ...req.body, updatedAt: new Date().toISOString() };
    
    await fs.writeFile(profilePath, JSON.stringify(profile, null, 2));
    res.json({ message: 'Profile updated', data: profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ADD/UPDATE Experience
router.post('/experience', verifyAuth, async (req, res) => {
  try {
    const experiencePath = path.join(__dirname, '../data/experience.json');
    const data = await fs.readFile(experiencePath, 'utf8');
    let items = JSON.parse(data);
    
    const newItem = { ...req.body, id: req.body.id || uuidv4() };
    const existingIndex = items.findIndex(e => e.id === newItem.id);
    
    if (existingIndex >= 0) {
      items[existingIndex] = newItem;
    } else {
      items.push(newItem);
    }
    
    await fs.writeFile(experiencePath, JSON.stringify(items, null, 2));
    res.json({ message: 'Experience item saved', data: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save experience' });
  }
});

// DELETE Experience
router.delete('/experience/:id', verifyAuth, async (req, res) => {
  try {
    const experiencePath = path.join(__dirname, '../data/experience.json');
    const data = await fs.readFile(experiencePath, 'utf8');
    let items = JSON.parse(data);
    
    items = items.filter(e => e.id !== req.params.id);
    
    await fs.writeFile(experiencePath, JSON.stringify(items, null, 2));
    res.json({ message: 'Experience item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// ADD/UPDATE Project
router.post('/projects', verifyAuth, async (req, res) => {
  try {
    const projectsPath = path.join(__dirname, '../data/projects.json');
    const data = await fs.readFile(projectsPath, 'utf8');
    let items = JSON.parse(data);
    
    const newItem = { ...req.body, id: req.body.id || uuidv4() };
    const existingIndex = items.findIndex(p => p.id === newItem.id);
    
    if (existingIndex >= 0) {
      items[existingIndex] = newItem;
    } else {
      items.push(newItem);
    }
    
    await fs.writeFile(projectsPath, JSON.stringify(items, null, 2));
    res.json({ message: 'Project saved', data: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

// DELETE Project
router.delete('/projects/:id', verifyAuth, async (req, res) => {
  try {
    const projectsPath = path.join(__dirname, '../data/projects.json');
    const data = await fs.readFile(projectsPath, 'utf8');
    let items = JSON.parse(data);
    
    items = items.filter(p => p.id !== req.params.id);
    
    await fs.writeFile(projectsPath, JSON.stringify(items, null, 2));
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ADD/UPDATE Publication
router.post('/publications', verifyAuth, async (req, res) => {
  try {
    const publicationsPath = path.join(__dirname, '../data/publications.json');
    const data = await fs.readFile(publicationsPath, 'utf8');
    let items = JSON.parse(data);
    
    const newItem = { ...req.body, id: req.body.id || uuidv4() };
    const existingIndex = items.findIndex(p => p.id === newItem.id);
    
    if (existingIndex >= 0) {
      items[existingIndex] = newItem;
    } else {
      items.push(newItem);
    }
    
    await fs.writeFile(publicationsPath, JSON.stringify(items, null, 2));
    res.json({ message: 'Publication saved', data: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save publication' });
  }
});

// DELETE Publication
router.delete('/publications/:id', verifyAuth, async (req, res) => {
  try {
    const publicationsPath = path.join(__dirname, '../data/publications.json');
    const data = await fs.readFile(publicationsPath, 'utf8');
    let items = JSON.parse(data);
    
    items = items.filter(p => p.id !== req.params.id);
    
    await fs.writeFile(publicationsPath, JSON.stringify(items, null, 2));
    res.json({ message: 'Publication deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete publication' });
  }
});

export default router;
