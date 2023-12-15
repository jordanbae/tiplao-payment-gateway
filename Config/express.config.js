// config/express.js
const express = require('express');
const loggerMiddleware = require('../middlewares/logger.middleware.js');
module.exports = (app) => {
    // Add any global middleware or configurations here
    app.use(loggerMiddleware);
};
