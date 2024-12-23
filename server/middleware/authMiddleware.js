const jwt = require('jsonwebtoken');
const prisma = require('../services/prisma'); 

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user; // Attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
};

module.exports = authMiddleware;