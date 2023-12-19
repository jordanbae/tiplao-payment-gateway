const axios = require('axios');

exports.generateQr = async (req, res, accessToken) => {
  try {
    // Ensure that the access token is present
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Access token is missing in the request headers.' });
    }

    // Prepare the request body for generateQr
    const generateQrRequestBody = {
      requestId: '2022110314567895',
      partnerId: 'LITD',
      mechantId: 'UIDDRPYBW7IZTTF0ET65ES3BG',
      txnAmount: 20000,
      billNumber: 'JDB547885467',
      terminalId: '121312121',
      terminalLabel: 'JDB000006',
      mobileNo: '2077004545',
    };

    // Prepare the headers with the access token
    const generateQrRequestConfig = {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
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
