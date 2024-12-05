const { verifyToken } = require('./jwt.js');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ error: 'Authorization token is required' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = decoded; // Attach user info to the request
  next(); // Continue to the next middleware or route handler
};

module.exports = authenticateJWT;
