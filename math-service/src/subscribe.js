const msInterface = require('message-service-interface');

const { divideHandler, subtractHandler } = require('./handler');

module.exports = () => {
  msInterface.subscribe('math.subtract.>', subtractHandler);
  msInterface.subscribe('math.divide.>', divideHandler);
};
