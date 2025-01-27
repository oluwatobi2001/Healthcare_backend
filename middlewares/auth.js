// middleware/authMiddleware.js

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // If the user is authenticated, proceed to the next middleware/route handler
    } else {
      return res.status(401).json({ message: 'Unauthorized access' }); // Or you can redirect to login
    }
  };
  
  module.exports = ensureAuthenticated;
  