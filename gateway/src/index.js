const { connect, close, getMsCon } = require('./interface/message-service.interface');
const { port, msOptions } = require('./config');
const app = require('./app');

const start = async () => {
  app.log.info(`Connecting to message service: ${msOptions.servers}`);
  await connect(msOptions);
  app.log.info('Message service connected successfully');

  const address = await app.listen({ port });
  app.log.info(`App is listening on: ${address}`);
};

const shutDown = async (signal) => {
  try {
    if (signal) app.log.info(`Received signal to terminate: ${signal}`);

    setTimeout(() => {
      app.log.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);

    if (getMsCon()) {
      app.log.info('Closing connection to message service...');
      await close();
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

process.once('SIGTERM', shutDown);
process.once('SIGINT', shutDown);

start().catch((error) => {
  app.log.error(error);
  shutDown();
});
