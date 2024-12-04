const jwt = require('jsonwebtoken');

const JWT_SECRET = 'hello world. this is me.';

// Function to sign a token
const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' }); // Set an expiration time (1 hour in this case)
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { signToken, verifyToken };
