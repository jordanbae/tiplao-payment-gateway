// pubnubService.js
const pubnub = require('../config/pubnub.config');

module.exports = {
    publishMessage: async (channel, message) => {
        return new Promise((resolve, reject) => {
            pubnub.publish({
                channel,
                message,
            }, (status, response) => {
                if (status.error) {
                    reject(status.error);
                } else {
                    resolve(response);
                }
            });
        });
    },
    // Add other PubNub-related functions as needed
};
