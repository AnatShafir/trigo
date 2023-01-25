const { connect: msConnect } = require('nats');

let connection;
let closedConnectionPromise;

const onClosedConnection = async () => {
  const error = await connection.closed();
  connection = null;
  if (error) {
    error.message = `Message service connection closed with error: ${error.message}`;
    throw error;
  }
};

const connect = async (options) => {
  connection = await msConnect(options);
  closedConnectionPromise = onClosedConnection();
};

const close = async () => {
  await connection.drain();
  await closedConnectionPromise;
};

const isConnected = () => (!!connection);

const getConnection = () => connection;

module.exports = {
  connect, close, isConnected, getConnection,
};
