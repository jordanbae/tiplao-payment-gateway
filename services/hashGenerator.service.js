require('dotenv').config();
const crypto = require('crypto');

const generateHash = (requestBody) => {
  try {
    const requestBodyString = JSON.stringify(requestBody);
    console.log(requestBodyString)
    const secretKeySpec = crypto.createHmac('sha256', process.env.SECRET_KEY);
    const encodedhash = secretKeySpec.update(requestBodyString, 'utf-8').digest('hex');
    return encodedhash;
  } catch (error) {
    console.error("Error generating hash in hashGenerator: ", error);
    return null;
  }
}

module.exports = generateHash
