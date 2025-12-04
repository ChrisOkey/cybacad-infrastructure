import express from 'express';

// Type declaration for global.db
declare global {
  var db: any;
}

const router = express.Router();

/**
 * POST /api/v1/hints
 * Saves a hint request/response to Firestore.
 */
router.post('/', async (req, res) => {
  const { userId, lessonId, prompt, hint } = req.body;

  // Validate required fields
  if (!userId || !lessonId || !prompt || !hint) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await global.db.collection('hintHistory').add({
      userId,
      lessonId,
      prompt,
      hint,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Failed to save hint:', err);
    res.status(500).json({ error: 'Failed to save hint' });
  }
});

export default router;
