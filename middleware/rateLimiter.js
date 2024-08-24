const rateLimit = (options) => {
    const requests = {};
    const { windowMs, maxRequests } = options;
  
    return (req, res, next) => {
      const ip = req.ip;
  
      if (!requests[ip]) {
        requests[ip] = {
          count: 1,
          startTime: Date.now()
        };
      } else {
        const elapsedTime = Date.now() - requests[ip].startTime;
  
        if (elapsedTime < windowMs) {
          requests[ip].count++;
          if (requests[ip].count > maxRequests) {
            return res.status(429).json({ message: "Too Many Requests - try again later" });
          }
        } else {
          requests[ip].count = 1;
          requests[ip].startTime = Date.now();
        }
      }
  
      next();
    };
  };

  module.exports = { rateLimit };
  