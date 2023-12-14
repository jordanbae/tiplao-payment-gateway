const express = require('express');
const router = express.Router();

const loggerMiddleware = require('../Middleware/logger.middleware');

router.use(loggerMiddleware);

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;
