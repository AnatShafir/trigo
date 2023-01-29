const pino = require('pino');

const { logLevel } = require('../config');

const flipParamsHook = {
  logMethod(inputArgs, method) {
    if (inputArgs.length >= 2) {
      const arg1 = inputArgs.shift();
      const arg2 = inputArgs.shift();
      return method.apply(this, [arg2, arg1, ...inputArgs]);
    }
    return method.apply(this, inputArgs);
  },
};

const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  hooks: flipParamsHook,
  ...(logLevel) && { level: logLevel },
});

module.exports = logger;
