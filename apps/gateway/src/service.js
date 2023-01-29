const msInterface = require('message-service-interface');

const app = require('./app');
const { port, msOptions } = require('./config');

const shutDown = async () => {
  const shutDownTimeout = setTimeout(() => {
    app.log.error('Failed to shut down, forcefully shutting down');
    process.exit(1);
  }, 10000);

  try {
    if (msInterface.isConnected()) {
      app.log.info('Closing connection to message service...');
      await msInterface.close();
      app.log.info('Message service connection closed successfully');
    }

    if (app.server.address()) {
      await app.close();
      app.log.info('Server closed successfully');
    }

    app.log.info('Service shut down successfully');
    clearTimeout(shutDownTimeout);
    process.exit(0);
  } catch (error) {
    app.log.error('Failed to shut down, forcefully shutting down', { error });
    clearTimeout(shutDownTimeout);
    process.exit(1);
  }
};

const handleSignal = async (signal) => {
  app.log.info('Received signal to terminate', { signal });
  await shutDown();
};

const handleFatalError = async (error) => {
  app.log.fatal('Fatal error, shutting down', { error });
  await shutDown();
};

const start = async () => {
  app.log.info('Connecting to message service', { server: msOptions.servers });
  const connectionEmitter = await msInterface.connect(msOptions);
  app.log.info('Message service connected successfully');
  connectionEmitter.on('error', handleFatalError);

  await app.listen({ port });
};

module.exports = { start, handleSignal, handleFatalError };
