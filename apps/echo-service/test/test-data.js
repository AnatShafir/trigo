const payload = { message: 'hello' };
const reqId = '1234';

const messageData = { payload, reqId };
const subject = `echo.${payload.message}`;
const expectedResponse = { decodedData: messageData };

module.exports = {
  messageData, subject, expectedResponse,
};
