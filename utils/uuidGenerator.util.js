const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

exports.generateUuid = () => {
    const generatedUuid = uuidv4();
    const currentDay = moment().format('YYYYMMDD');
    const timestamp = moment().format('HHmmssSSS');

    let combinedUuid = `${currentDay}${timestamp}${generatedUuid.replace(/-/g, '')}`;

    if (combinedUuid.length > 25) {
        combinedUuid = combinedUuid.slice(0, 25);
    }

    while (combinedUuid.length < 25) {
        combinedUuid += '0';
    }

    return combinedUuid;
}