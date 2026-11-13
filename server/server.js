import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import connectDB from './config/db.js';
import poojaRoutes from './routes/poojaRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in deployment unless restricted
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];

  res.json({
    status: 'healthy',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      status: states[dbState] || 'Unknown',
      connected: dbState === 1,
      host: mongoose.connection.host || 'localhost',
      name: mongoose.connection.name || 'temple_db',
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/pooja-bookings', poojaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/donations', donationRoutes);

import fs from 'fs';

// Static assets (serves Vite build if present, e.g. for production or standalone deployment)
const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  console.log(`[Server] Serving production static files from ${distPath}`);
  app.use(express.static(distPath));

  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 404 handler for API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
    });
  }
  next();
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(` Temple Website API Server is running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
