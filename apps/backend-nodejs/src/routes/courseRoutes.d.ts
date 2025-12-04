import { Router } from 'express';
import { courses } from '../db/seed/courses';
import type { ApiResponse } from '../lib/types';

const router = Router();

router.get('/', (req, res) => {
  const response: ApiResponse<{ courses: typeof courses }> = {
    success: true,
    data: { courses },
  };
  res.json(response);
});

export default router;
