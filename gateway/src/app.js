const app = require('fastify')({ logger: true });

const router = require('./router');

app.register(router, { prefix: '/' });
app.after((error) => app.log.error(error));

module.exports = app;
