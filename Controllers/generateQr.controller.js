require('dotenv').config();
const axios = require('axios');
const generateHash = require('../utils/hashGenerator.util');
const uuidGenerator = require('../utils/uuidGenerator.util');
exports.generateQr = async (req, res, accessToken, qrRequestBody) => {
  try {
    // Ensure that the access token is present
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Access token is missing in the request headers.' });
    }
    //Generate requestId
    const requestId = uuidGenerator.generateUuid();

    // Read environment variables
    const partnerId = process.env.PARTNER_ID;
    const merchantId = process.env.MERCHANT_ID
    
    //Exracted qrRequestBody Object
    const txnAmount = qrRequestBody.txnAmount;
    const billNumber = qrRequestBody.billNumber;
    const terminalId = qrRequestBody.terminalId;
    const terminalLabel = qrRequestBody.terminalLabel;
    const mobileNo = qrRequestBody.mobileNo;


    // Prepare the request body for generateQr
    const generateQrRequestBody = {
      requestId: requestId,
      partnerId: partnerId,
      mechantId: merchantId,
      txnAmount: txnAmount,
      billNumber: billNumber, 
      terminalId: terminalId, 
      terminalLabel: terminalLabel, 
      mobileNo: mobileNo, 
    };
    //Hashing request body
    const signedHash = generateHash(generateQrRequestBody);

    // Prepare the headers with the access token
    const generateQrRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'SignedHash': signedHash,
      },
    };

    // Make a request to the generateQr API
    const generateQrUrl = process.env.GENERATE_QR_URL;
    const generateQrResponse = await axios.post(generateQrUrl, generateQrRequestBody, generateQrRequestConfig);

    // Handle the generateQr API response
    return res.status(generateQrResponse.status).json(generateQrResponse.data);
  } catch (error) {
    // Handle errors
    console.error('Error in generateQr:', error);
    return res.status(500).json({ error: 'Gateway: Internal server error in generateQr.' });
  }
};
