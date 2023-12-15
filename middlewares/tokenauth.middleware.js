const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== process.env.BEARER_TOKEN) {
    return res.status(401).json({
      timestamp: new Date().toISOString(),
      success: false,
      status: 'unauthorized',
      message: 'Authentication failed',
      data: [{ error: 'Invalid or missing Bearer Token' }]
    });
  }
  next();
};

module.exports = authenticateToken;