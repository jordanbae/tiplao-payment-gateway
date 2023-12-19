// Testing

const testData = (req, res) => {
  const responseData = {
    message: 'This is a test response!',
    data: {
      key1: 'value1',
      key2: 'value2',
    },
  };
  res.json(responseData);
};

module.exports = {
  testData,
};
