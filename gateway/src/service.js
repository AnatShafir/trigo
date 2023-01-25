const msInterface = require('message-service-interface');

const app = require('./app');
const { port, msOptions } = require('./config');

const shutDown = async (signal) => {
  try {
    if (signal) app.log.info('Received signal to terminate', { signal });

    setTimeout(() => {
      app.log.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);

    if (msInterface.isConnected()) {
      app.log.info('Closing connection to message service...');
      await msInterface.close();
      app.log.info('Message service connection closed successfully');
    }

    if (!app.server) process.exit(0);

    await app.close();
    app.log.info('Server closed successfully');
    process.exit(0);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    app.log.info('Connecting to message service', { server: msOptions.servers });
    await msInterface.connect(msOptions);
    app.log.info('Message service connected successfully');

    await app.listen({ port });
  } catch (error) {
    app.log.error(error);
    shutDown();
  }
};

module.exports = { start, shutDown };
