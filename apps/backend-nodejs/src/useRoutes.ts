import { Router } from "express";

const router = Router();

// Example user routes
router.get("/", (_req, res) => {
  res.json({ message: "Users route working" });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  // Normally you'd validate with Zod here
  res.json({ success: true, user: { name, email } });
});

// Add more user-related routes as needed
// e.g. router.get("/:id", ...)

export default router;
