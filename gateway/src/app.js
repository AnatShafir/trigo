const app = require('fastify')({ logger: true });

const router = require('./router');

app.register(router, { prefix: '/' });

module.exports = app;
