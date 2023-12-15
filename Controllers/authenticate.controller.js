require('dotenv').config();
const axios = require('axios');

exports.authenticate = async (req, res) => {
    try {
        // Extract request parameters
        const { requestId, partnerId, clientId, clientSecret } = req.body;

        // Perform additional validations (length, uniqueness, etc.)

        // Construct the request to the bank's API
        const bankApiUrl = `${process.env.JDB_URL_UAT}/authenticate`;
        const bankApiRequest = {
            requestId,
            partnerId,
            clientId,
            clientSecret,
        };

        // Construct the headers for the request
        const bnkaApiHeaders = {
            'Content-Type': 'application/json',
            // Include the Bearer token obtained during authentication
            'Authorization': 'Bearer',
            // Include the signed hash data key
            'SignedHash': 'Hash Data',
        };

        // Send the request to the bank's API with headers
        const bankApiResponse = await axios.post(bankApiUrl, bankApiRequest, { headers: bnkaApiHeaders });

        // Handle the response from the bank's API
        const { data: bankApiData } = bankApiResponse;

        // Construct the response format for your application
        const responseFormat = {
            timestamp: new Date().toISOString(),
            success: true,
            message: 'Authentication successful',
            transactionId: requestId,
            status: 'OK',
            data: bankApiData.data, // Assuming the data field from the bank's API response is an array object
        };

        // Pass the formatted response back to the application
        res.json(responseFormat);
    } catch (error) {
        console.error(error);

        // Handle errors based on the response format from the bank's API
        const errorResponseFormat = {
            timestamp: new Date().toISOString(),
            success: false,
            status: 'Error',
            message: 'Error occurred during authentication',
            data: error.response ? error.response.data : null,
        };
        // Send the error response back to the application
        res.status(error.response ? error.response.status : 500).json(errorResponseFormat);
    }
};