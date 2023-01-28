const msInterface = require('message-service-interface');

const { echoHandler } = require('./handler');

module.exports = () => {
  msInterface.subscribe('echo.*', echoHandler);
};
