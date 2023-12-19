// routes.js
const express = require('express');
const router = express.Router();


const testController = require('../controllers/test.controller');
const authenticateController = require('../controllers/authenticate.controller')
const generateQrController = require('../controllers/generateQr.controller')
const checkTransaction = require('../controllers/checkTransaction.controller')
// Define the routes
router.get('/test', testController.testData);
router.post('/authenticate', authenticateController.authenticate)
router.post('/generateQr', generateQrController.generateQr)


// Wildcard route to handle all other routes in the 'route' folder
router.use('/', (req, res) => {
  return res.status(405).json({
    error: 'Method or Path not found.',
  });
});

module.exports = router;
