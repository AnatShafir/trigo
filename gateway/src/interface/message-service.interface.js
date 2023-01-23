const nats = require('nats');

let connection;

const connect = async (options) => {
  connection = await nats.connect(options);
};

const close = () => connection.close();

const getMsCon = () => connection;

module.exports = { connect, close, getMsCon };
