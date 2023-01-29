const logger = require('./utils/logger');
const validateMessage = require('./utils/validate-message');

const handleValidationErrors = (errors, messageInfo, respond) => {
  logger.error('Message is invalid', { ...messageInfo, errors });
  if (respond) {
    const response = {
      payload: { errors },
      ...(messageInfo?.reqId) && { reqId: messageInfo.reqId },
    };
    respond(response);
  }
};

const echoHandler = (message) => {
  const messageInfo = {
    ...(message?.subject) && { subject: message.subject },
    ...(message?.decodedData?.reqId) && { reqId: message.decodedData.reqId },
    ...(message?.decodedData?.payload) && { payload: message.decodedData.payload },
  };

  logger.info('Received new message', messageInfo);

  const validationErrors = validateMessage(message);
  if (validationErrors.length > 0) {
    handleValidationErrors(validationErrors, messageInfo, message.encodeRespond);
    return;
  }

  const { payload, reqId } = message.decodedData;
  logger.info('Received new message', messageInfo);
  const { message: echoMessage } = payload;
  const response = { reqId, payload: { message: echoMessage } };
  message.encodeRespond(response);
  logger.info('Responded to message', { messageInfo, response });
};

module.exports = { echoHandler };
