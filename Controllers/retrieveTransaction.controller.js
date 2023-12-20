const axios = require('axios');
const generateHash = require('../services/hashGenerator.service');
exports.retrieveTransaction = (req, res) => {
    // Extract the signedHash from the headers
    const signedHash = req.headers['signedhash'];
    // Transaction Data
    const transactionData = req.body;
    // Comparing between signedHash from the request and the body.
    // Check if the transaction was successful based on the "message" field
    if(compareSignedHash(res, signedHash, transactionData)){
        if (transactionData.message === 'SUCCESS') {
            // Extract relevant information from the bank data
            // const refNo = transactionData.refNo;
            // const txnAmount = transactionData.txnAmount;
            
            // Call another API or perform additional actions based on the success status and signedHash
            // Replace the following line with your actual logic
            // callAnotherAPI(refNo, txnAmount, signedHash);
            
            // Send a success response
            return res.status(200).json({ success: true, message: 'Transaction successful' });
        } else {
            // If the transaction is not successful, you can customize the response accordingly
            return res.status(200).json({ success: false, message: 'Transaction failed' });
        }
    }
};

function callAnotherAPI(refNo, txnAmount, signedHash) {
    // axios.post('https://your-api-endpoint.com/another-api', { refNo, txnAmount, signedHash })
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    // For the sake of example, let's just log the information
    console.log(`Calling another API with refNo: ${refNo}, txnAmount: ${txnAmount}, signedHash: ${signedHash}`);
}

function compareSignedHash(res, signedHash, requestBodyData){
    const signedHashCopy = generateHash(requestBodyData);
    console.log("COMPARE SIGNED HASH ===> ", signedHash + " " + signedHashCopy)
    if(signedHash !== signedHashCopy){
        return res.status(400).json({ success: false, message: 'Bad request, unmatch Signed Hash and Body' });
    }

    return true;

}