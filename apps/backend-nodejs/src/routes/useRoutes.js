import express from 'express';

const router = express.Router();

/**
 * GET /api/v1/use
 * Simple placeholder route to confirm the router is working.
 */
router.get('/', (req, res) => {
  res.json({ message: 'useRoutes is active!' });
});

/**
 * GET /api/v1/use/status
 * Example endpoint to return basic status info.
 */
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/v1/use/echo
 * Example endpoint to echo back posted data.
 */
router.post('/echo', (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

export default router;
