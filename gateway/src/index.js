const app = require('./app');
const { port } = require('./config');

const start = async () => {
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
