// config/express.js
const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('../middlewares/logger.middleware.js');
module.exports = (app) => {
    // Add any global middleware or configurations here
    app.use(bodyParser.json());
    app.use(loggerMiddleware);
};
