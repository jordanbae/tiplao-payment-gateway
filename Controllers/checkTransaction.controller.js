require('dotenv').config();
const axios = require('axios');

// Controller function for the checkTransaction endpoint
exports.checkTransaction = async (req, res, accessToken) => {
  try {
    // Extract data from the request body
    const { requestId, billNumber } = req.body;

    // Validate request parameters
    if (!requestId || typeof requestId !== 'string' || requestId.length > 25) {
      return res.status(400).json({ error: 'Invalid requestId. It should be a string up to 25 characters.' });
    }

    if (!billNumber || typeof billNumber !== 'string' || billNumber.length > 25) {
      return res.status(400).json({ error: 'Invalid billNumber. It should be a string up to 25 characters.' });
    }

    // Prepare the headers with the access token
    const checkTransactionConfig = {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    };

    // Make a request to the checkTransaction API (replace the URL with your actual API endpoint)
    const checkTransactionUrl = process.env.CHECKTRANSACTION_URL;
    const response = await axios.post(apiUrl, { requestId, billNumber });
    
    

    // Handle the API response
    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error in checkTransaction:', error);
    return res.status(500).json({ error: 'Internal server error in checkTransaction.' });
  }
};
