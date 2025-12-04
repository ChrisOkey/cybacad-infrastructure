import { Router, Request, Response, NextFunction } from 'express';
// import { getFirestore } from '../config/initSecrets'; // Uncomment when ready to use DB

const router = Router();

/**
 * GET /hints
 * Description: Retrieve a list of hints.
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // --- EXAMPLE: How to fetch from Firestore (when ready) ---
    // const db = await getFirestore();
    // const snapshot = await db.collection('hints').get();
    // const hints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // res.json(hints);

    // --- CURRENT: Mock Response to make TypeScript happy ---
    const mockHints = [
      { id: 1, content: "Don't forget to handle errors in your promises." },
      { id: 2, content: "Always use strict types in TypeScript." }
    ];

    res.status(200).json({
      success: true,
      data: mockHints
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
});

/**
 * GET /hints/:id
 * Description: Get a specific hint by ID.
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Logic to find hint by ID would go here
    
    res.status(200).json({
      success: true,
      message: `You requested hint with ID: ${id}`
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /hints
 * Description: Create a new hint.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;

    if (!content) {
       res.status(400).json({ error: 'Content is required' });
       return; // return needed to stop execution
    }

    // --- EXAMPLE: Save to Firestore ---
    // const db = await getFirestore();
    // await db.collection('hints').add({ content, createdAt: new Date() });

    res.status(201).json({
      success: true,
      message: "Hint created successfully",
      data: { content }
    });
  } catch (error) {
    next(error);
  }
});

export default router;