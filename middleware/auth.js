// Middleware to restrict API requests in production
const restrictAccess = (req, res, next) => {
      const allowedDomain = '.grabtern.in';
      const host = req.get('Host') || '';
      if (!host.endsWith(allowedDomain)) {
        return res.status(403).send('Forbidden: Access is restricted to .grabtern.in');
      }
    next();
  };

  module.exports = {restrictAccess};
  