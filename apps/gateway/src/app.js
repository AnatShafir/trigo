const fastify = require('fastify');

const { logLevel } = require('./config');
const router = require('./router');

const loggerOptions = {
  level: logLevel,
};
const app = fastify({ logger: loggerOptions });

app.register(router, { prefix: '/' });

module.exports = app;
