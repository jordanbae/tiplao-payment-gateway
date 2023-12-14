const express = require('express');
const router = express.Router();
const authenticationController = require('../Controllers/authenticate.controller');

router.post('/autenticate', authenticationController.authenticate);

module.exports = router;
