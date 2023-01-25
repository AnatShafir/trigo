const msInterface = require('message-service-interface');

const basicSubject = 'math';

const mathMessage = (operationName) => async (firstNumber, secondNumber, reqId) => {
  const subject = `${basicSubject}.${operationName}.${firstNumber}.${secondNumber}`;
  const payload = { firstNumber, secondNumber };
  const data = { payload, reqId };
  const response = await msInterface.messageRequest(subject, data);
  return response?.decodedData?.payload;
};

const subtractMessage = mathMessage('subtract');

const divideMessage = mathMessage('divide');

module.exports = { subtractMessage, divideMessage };
