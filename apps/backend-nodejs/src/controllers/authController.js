import { auth, db } from '../config/firebase.js';
import { protect } from '../middleware/authMiddleware.js'; 

// Export the middleware so the route file can use it
export { protect };

/**
 * POST /api/v1/auth/signup
 * Create a new user (Server-side provisioning)
 */
export const signup = async (req, res) => {
    const { email, password, displayName } = req.body;

    try {
        // 1. Create User in Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: displayName || 'Student'
        });

        // 2. Create User Document in Firestore (For progress tracking)
        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            displayName: displayName || 'Student',
            role: 'student', // Default role
            completedLessons: [],
            joinedAt: new Date().toISOString()
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            uid: userRecord.uid
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(400).json({ 
            status: 'error',
            message: error.message 
        });
    }
};

/**
 * POST /api/v1/auth/login
 * Verifies ID Token sent from Frontend and Syncs User to DB
 */
export const login = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "ID Token is required" });
    }

    try {
        // 1. Verify the Token
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        // 2. Check if user exists in Firestore (Sync)
        const userRef = db.collection('users').doc(uid);
        const userSnap = await userRef.get();

        let userData;

        if (!userSnap.exists) {
            // If user logged in via Google but doesn't have a Firestore doc yet, create it.
            userData = {
                email: decodedToken.email,
                displayName: decodedToken.name || 'Student',
                role: 'student',
                completedLessons: [],
                joinedAt: new Date().toISOString()
            };
            await userRef.set(userData);
        } else {
            userData = userSnap.data();
        }

        // 3. Return Success
        res.status(200).json({ 
            status: 'success',
            message: 'Token verified and user synced.',
            user: userData
        });

    } catch (error) {
        console.error("Login Verify Error:", error);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

/**
 * GET /api/v1/auth/profile
 * Protected route to get current user data
 */
export const getProfile = async (req, res) => {
    try {
        // req.user is populated by the 'protect' middleware
        const userRef = db.collection('users').doc(req.user.uid);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            return res.status(404).json({ message: "User profile not found in database." });
        }

        res.status(200).json({
            status: 'success',
            user: userSnap.data()
        });

    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ message: "Server error fetching profile." });
    }
};