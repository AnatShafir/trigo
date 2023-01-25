const { start, shutDown } = require('./service');

process.once('SIGTERM', shutDown);
process.once('SIGINT', shutDown);
process.once('uncaughtException', shutDown);
process.once('unhandledRejection', shutDown);

start();
