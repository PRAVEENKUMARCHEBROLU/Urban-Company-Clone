const jwt = require('jsonwebtoken');

// Middleware to protect routes
// This middleware checks if the request has a valid JWT token
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decorded:",decoded);
    req.user = decoded.user;
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

//role-based access control middleware
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};

//add admin role based access control
const adminonly = (req,res,next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ msg: 'Access denied, admin only' });
  }
};
//add provider role based access control for booking routes
const provideronly = (req, res, next) => {
  if (req.user.role !== 'provider') {
    return res.status(403).json({ msg: 'Access denied: Providers only' });
  }
  next();
};


module.exports = { protect, provideronly, authorize, adminonly };