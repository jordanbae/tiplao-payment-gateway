require('dotenv').config();
const axios = require('axios');
const generateQrController = require('./generateQr.controller'); // Import the generateQr controller

exports.authenticate = async (req, res) => {
  try {
    // Validate the request body
    const { requestId } = req.body;
    console.log(requestId);
    if (!requestId || typeof requestId !== 'string' || requestId.length > 25) {
      return res.status(400).json({ error: 'Gateway: Invalid requestId. It should be a string up to 25 characters.' });
    }

    // Read environment variables
    const partnerId = process.env.PARTNER_ID;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    // Validate environment variables
    if (!partnerId || typeof partnerId !== 'string' || partnerId.length > 10 ||
      !clientId || typeof clientId !== 'string' || clientId.length > 10 ||
      !clientSecret || typeof clientSecret !== 'string') {
      return res.status(500).json({ error: 'Gateway: Internal server error. Invalid environment variables.' });
    }

    // Prepare the request body
    const requestBody = {
      requestId,
      partnerId,
      clientId,
      clientSecret,
    };

    // Make a request to the API
    const authenticateUrl = process.env.AUTHENTICATE_URL;
    const response = await axios.post(authenticateUrl, requestBody);
    
    // Handle the API response
    if (response.status === 200 && response.data.success) {
      // Pass the response from bankapi to gateway generateQr controller
      // const authenticateResponse = 
      const accessToken = response.data.data.accessToken;
      await generateQrController.generateQr(req, res, accessToken);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    // Handle errors
    console.error('Error in authentication:', error);
    return res.status(500).json({ error: 'Gateway: Internal server error from gateway.' });
  }
};
