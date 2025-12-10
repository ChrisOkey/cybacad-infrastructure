import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

// Import Routes
import aiRoutes from './routes/aiRoutes';

dotenv.config();

// Initialize Firebase Admin (if not already done elsewhere)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'cybacad-dev' 
  });
}

// ✅ DEFINE APP
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ REGISTER ROUTES
app.use('/api/ai', aiRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('CybAcad Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});