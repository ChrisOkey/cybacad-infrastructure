const express = require("express");
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

router.post("/", async (req, res) => {
  const { userId, lessonId, prompt, hint } = req.body;

  if (!userId || !lessonId || !prompt || !hint) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.collection("hintHistory").add({
      userId,
      lessonId,
      prompt,
      hint,
      createdAt: new Date().toISOString(),
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save hint" });
  }
});

module.exports = router;
