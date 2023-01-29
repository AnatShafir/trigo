const fastify = require('fastify');

const { loggerOptions } = require('./config');
const router = require('./router');

const app = fastify({ logger: loggerOptions });

app.register(router, { prefix: '/' });

module.exports = app;
