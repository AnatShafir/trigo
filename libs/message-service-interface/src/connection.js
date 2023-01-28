const { connect: natsConnect } = require('nats');
const EventEmitter = require('events');

let connection;

const connect = async (options) => {
  connection = await natsConnect(options);
  const connectionEmitter = new EventEmitter();
  connection.closed().then((error) => {
    connection = null;
    if (error) {
      const onCloseError = new Error('Connection closed with error', { cause: error });
      connectionEmitter.emit('error', onCloseError);
    }
  });
  return connectionEmitter;
};

const close = async () => await connection?.drain();

const isConnected = () => (!!connection);

const getConnection = () => connection;

module.exports = {
  connect, close, isConnected, getConnection,
};
