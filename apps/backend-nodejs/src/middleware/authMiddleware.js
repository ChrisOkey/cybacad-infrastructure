import { auth } from '../config/firebase.js'; // Import Firebase Auth client

/**
 * Middleware to verify a Firebase ID token and attach the user object to the request.
 * Required for all protected API endpoints.
 */
export const protect = async (req, res, next) => {
    let token;

    // 1. Check for token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: "Bearer TOKEN")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the ID token using Firebase Admin SDK
            // This checks the token's signature, expiry, and validity.
            const decodedToken = await auth.verifyIdToken(token);
            
            // 3. Attach the decoded user object (UID, email, etc.) to the request
            req.user = decodedToken;
            
            // Proceed to the next middleware or controller
            next();

        } catch (error) {
            console.error('Authentication Error:', error.message);
            // Token is invalid, expired, or missing
            return res.status(401).json({ 
                status: 'error', 
                message: 'Not authorized, token failed or is invalid.' 
            });
        }
    }

    if (!token) {
        // No token was provided in the header
        res.status(401).json({ 
            status: 'error', 
            message: 'Not authorized, no token provided.' 
        });
    }
};
