const logger = require('./utils/logger');
const validateMessage = require('./utils/validate-message');

const handleValidationError = (messageInfo, respond) => {
  const { errors } = validateMessage.errors;
  logger.error('Message is invalid', { ...messageInfo, errors });
  if (respond) respond({ errors });
};

const createMathHandler = (calcResult) => (message) => {
  const messageInfo = {
    subject: message?.subject,
    reqId: message?.decodedData?.reqId,
    payload: message?.decodedData?.payload,
  };

  logger.info('Received new message', messageInfo);

  if (!validateMessage(message)) {
    handleValidationError(messageInfo, message.encodeRespond);
    return;
  }

  const { payload, reqId } = message.decodedData;
  logger.info('Received new message', messageInfo);
  const { firstNumber, secondNumber } = payload;
  logger.info('Calculating...', messageInfo);
  const result = calcResult(firstNumber, secondNumber);
  const response = { reqId, payload: { result } };
  message.encodeRespond(response);
  logger.info('Responded to message', { messageInfo, response });
};

const calcDivideResult = (firstNumber, secondNumber) => firstNumber / secondNumber;
const divideHandler = createMathHandler(calcDivideResult);

const calcSubtractResult = (firstNumber, secondNumber) => firstNumber - secondNumber;
const subtractHandler = createMathHandler(calcSubtractResult);

module.exports = { divideHandler, subtractHandler };
