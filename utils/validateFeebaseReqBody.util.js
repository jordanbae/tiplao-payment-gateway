const validateFeebaseReqBody = ({txnAmount, billNumber, terminalId,terminalLabel,mobileNo}) => {
     // Validate txnAmount
  if (typeof txnAmount !== 'number' || isNaN(txnAmount) || txnAmount <= 0 || txnAmount.toString().length > 13) {
    console.error('Invalid txnAmount. It should be a number, not null or empty, and up to 13 digits.');
    return false;
  }

  // Validate billNumber
  if (typeof billNumber !== 'string' || billNumber.trim() === '' || billNumber.length > 25) {
    console.error('Invalid billNumber. It should be a string, not null or empty, and up to 25 characters.');
    return false;
  }

   // Validate terminalId
   if (typeof terminalId !== 'string' || terminalId.trim() === '' || terminalId.length > 25) {
    console.error('Invalid terminalId. It should be a string, not null or empty, and up to 25 characters.');
    return false;
  }

   // Validate terminalLabel
   if (typeof terminalLabel !== 'string' || terminalLabel.trim() === '' || terminalLabel.length > 25) {
    console.error('Invalid terminalLabel. It should be a string, not null or empty, and up to 25 characters.');
    return false;
  }

   // Validate mobileNo
   if (typeof mobileNo !== 'string' || mobileNo.trim() === '' || mobileNo.length > 25) {
    console.error('Invalid mobileNo. It should be a string, not null or empty, and up to 25 characters.');
    return false;
  }

  // All validations passed
  return true;
}

module.exports = validateFeebaseReqBody