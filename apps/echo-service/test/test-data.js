const payload = { message: 'hello' };
const reqId = '1234';

const messageData = { payload, reqId };
const subject = `echo.${payload.message}`;
const expectedResponse = { decodedData: messageData };

const getSubject = () => `echo.${Math.round(Math.random() * 10000).toString(16)}`;

module.exports = {
  getSubject, messageData, subject, expectedResponse,
};
