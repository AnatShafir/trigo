const msInterface = require('message-service-interface');

const logger = require('./utils/logger');
const { msOptions } = require('./config');
const subscribe = require('./subscribe');

const shutDown = async (signal) => {
  try {
    if (signal) logger.info('Received signal to terminate', { signal });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);

    if (msInterface.isConnected()) {
      logger.info('Closing connection to message service...');
      await msInterface.close();
      logger.info('Message service connection closed successfully');
    }

    logger.info('Service shut down successfully');
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    logger.info('Connecting to message service', { server: msOptions.servers });
    await msInterface.connect(msOptions);
    logger.info('Message service connected successfully');

    subscribe();
    logger.info('Subscribed to message service successfully');
  } catch (error) {
    logger.error(error);
    shutDown();
  }
};

module.exports = { start, shutDown };
