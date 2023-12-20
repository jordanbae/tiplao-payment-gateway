require('dotenv').config();
const allowedIPs = process.env.ALLOWED_IPS.split(',');

const whitelistedIp = (req, res, next) => {
    const clientIP = req.ip; // Express provides the IP address in the req.ip property
    if (allowedIPs.includes(clientIP)) {
      // IP is in the whitelist, allow the request to continue
      next();
    } else {
      // IP is not in the whitelist, deny the request
      res.status(403).send('Forbidden: Access denied from your IP address');
    }
};

module.exports = whitelistedIp