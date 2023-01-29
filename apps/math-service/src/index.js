const { start, handleSignal, handleFatalError } = require('./service');

process.once('SIGTERM', handleSignal);
process.once('SIGINT', handleSignal);
process.once('uncaughtException', handleFatalError);
process.once('unhandledRejection', handleFatalError);

start().catch(handleFatalError);
