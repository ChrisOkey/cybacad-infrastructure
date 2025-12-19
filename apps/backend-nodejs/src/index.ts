import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

// Import Routes
import aiRoutes from './routes/aiRoutes';
import courseRoutes from './routes/courseRoutes';

dotenv.config();

// ==================================================
// 1. FIREBASE INITIALIZATION (CLOUD ONLY)
// ==================================================
// ⚠️ We removed the Emulator logic. This now ALWAYS connects to the Cloud.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'cybuniapp' // Force Production Project ID
    });
    console.log("☁️ Backend connected to PRODUCTION CLOUD (cybuniapp)");
  } catch (error) {
    console.error("❌ Firebase Init Failed:", error);
  }
}

const app = express();

// ==================================================
// 2. MIDDLEWARE
// ==================================================
app.use(cors({
  origin: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ==================================================
// 3. ROUTES
// ==================================================
app.use('/api/ai', aiRoutes);
app.use('/api/v1/courses', courseRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('✅ CybAcad Backend is Running (Cloud Mode)!');
});

// ==================================================
// 4. START SERVER
// ==================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 AI Routes:     http://localhost:${PORT}/api/ai`);
  console.log(`👉 Course Routes: http://localhost:${PORT}/api/v1/courses`);
});