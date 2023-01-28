const { JSONCodec } = require('nats');

const { getConnection } = require('./connection');

const jc = JSONCodec();

module.exports = async (subject, data) => {
  try {
    const connection = getConnection();
    const encodedData = jc.encode(data);
    const response = await connection?.request(subject, encodedData);
    if (response.data.length) response.decodedData = jc.decode(response.data);
    return response;
  } catch (error) {
    if (error.code === '503') error.message = `This request has no responders: ${error.message}`;
    throw error;
  }
};
