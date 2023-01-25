const logger = require('./utils/logger');

const createMathHandler = (operationName, calcResult) => (message) => {
  if (!message.decodedData) {
    logger.error('Received new message with no data', { subject: message.subject });
    message.encodeRespond(new Error('No data'));
    return;
  }

  const { payload, reqId } = message.decodedData;
  const { firstNumber, secondNumber } = payload;
  logger.info('Received new message', { reqId, operationName, payload });
  logger.info('Calculating...', { reqId, operationName, payload });
  const result = calcResult(firstNumber, secondNumber);
  message.encodeRespond({ result, reqId });
  logger.info('Responded to message', {
    reqId, operationName, payload, result,
  });
};

const calcDivideResult = (firstNumber, secondNumber) => firstNumber / secondNumber;
const divideHandler = createMathHandler('divide', calcDivideResult);

const calcSubtractResult = (firstNumber, secondNumber) => firstNumber - secondNumber;
const subtractHandler = createMathHandler('subtract', calcSubtractResult);

module.exports = { divideHandler, subtractHandler };
