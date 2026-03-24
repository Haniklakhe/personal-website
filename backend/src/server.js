import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import profileRoutes from './routes/profile.js';
import experienceRoutes from './routes/experience.js';
import projectRoutes from './routes/projects.js';
import publicationRoutes from './routes/publications.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const allowedOrigins = [
  (process.env.FRONTEND_URL || '').trim(),
  'http://localhost:3000',
  'https://frontend-flame-mu-16.vercel.app',
  'https://haniklakhe.github.io'
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server and same-origin requests without Origin header.
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/admin', adminRoutes);

// Friendly landing routes when opened in browser
app.get('/', (req, res) => {
  res.status(200).send('Backend is running. Use /api/health or /api/profile endpoints.');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Personal website backend API',
    endpoints: [
      '/api/health',
      '/api/profile',
      '/api/experience',
      '/api/projects',
      '/api/publications',
      '/api/admin/login'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${join(__dirname, 'data')}`);
  });
}

export default app;
