const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticate.controller');

router.post('/autenticate', authenticationController.authenticate);

module.exports = router;
