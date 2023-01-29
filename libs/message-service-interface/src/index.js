const { connect, close, isConnected } = require('./connection');
const messageRequest = require('./message-request');
const subscribe = require('./subscribe');

module.exports = {
  connect, close, messageRequest, subscribe, isConnected,
};
