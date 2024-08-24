const jwt = require('jsonwebtoken');

const secretKey = process.env.EMAIL_SERVICE_SECRET;
const restrictAccess = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
      
      next();
    });
};

module.exports = { restrictAccess };
