const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1]; // Get token after 'Bearer '

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.user = decoded; // Save user info for next middleware/routes
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protectAdmin;
