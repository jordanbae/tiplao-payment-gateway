require('dotenv').config()

const PubNub = require('pubnub');

const pubnub = new PubNub({
    uuid: `${process.env.PUBNUB_USER_ID}`,
    subscribeKey: `${process.env.PUBNUB_SUBSCRIBE_KEY}`,
    // Add other PubNub configuration options as needed
});

module.exports = pubnub;