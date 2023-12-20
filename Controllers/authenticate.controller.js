require('dotenv').config();
const axios = require('axios');
const generateQrController = require('./generateQr.controller'); // Import the generateQr controller
const uuidGenerator = require('../services/uuidGenerator.service');
const validateFeebaseReqBody = require('../services/validateFeebaseReqBody.service')
const hashGenerator = require('../services/hashGenerator.service');
const generateHash = require('../services/hashGenerator.service');

exports.authenticate = async (req, res) => {
  try {
    //Request body from client
    const {txnAmount,billNumber,terminalId,terminalLabel,mobileNo} = req.body;
    
    //Generate requestId
    const requestId = uuidGenerator.generateUuid();
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

    // Validate request body
    if(!validateFeebaseReqBody({txnAmount, billNumber, terminalId,terminalLabel,mobileNo})){
      return res.status(500).json({error: 'Internal server error. Invalid request body from client.'})
    }

    // Prepare the request body
    const authRequestBody = {
      requestId,
      partnerId,
      clientId,
      clientSecret,
    };

    //Hashing request body
    const signedHash = generateHash(authRequestBody);
    
    //Header
    const authenticateRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'SignedHash': signedHash,
      },
    };
    // Make a request to the API
    const authenticateUrl = process.env.AUTHENTICATE_URL;
    const response = await axios.post(authenticateUrl, authRequestBody, authenticateRequestConfig);
    // const response = await axios.post(authenticateUrl, authRequestBody);

    // Billing Info request body for qr generator
    const qrRequestBody = {
      txnAmount,
      billNumber,
      terminalId,
      terminalLabel,
      mobileNo
    }
    // Handle the API response
    if (response.status === 200 && response.data.success) {
      // Pass the response from bankapi to gateway generateQr controller
      const accessToken = response.data.data.accessToken;
      await generateQrController.generateQr(req, res, accessToken, qrRequestBody);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    // Handle errors
    console.error('Error in authentication:', error);
    return res.status(500).json({ error: 'Gateway: Internal server error' });
  }
};
