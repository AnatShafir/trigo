const msInterface = require('message-service-interface');

const basicSubject = 'echo';

const echoMessage = async (message, reqId) => {
  const subject = `${basicSubject}.${message}`;
  const payload = { message };
  const data = { payload, reqId };
  const response = await msInterface.messageRequest(subject, data);
  return response?.decodedData?.payload;
};

module.exports = { echoMessage };
