const payload = { hello: 'world' };
const reqId = '1234';
const data = { payload, reqId };

const getSubject = () => Math.random().toString(16);

module.exports = {
  payload, reqId, data, getSubject,
};
