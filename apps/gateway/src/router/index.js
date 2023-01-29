const mathRouter = require('./math.router');
const echoRouter = require('./echo.router');

module.exports = (app, _, done) => {
  app.register(mathRouter, { prefix: '/math' });
  app.register(echoRouter, { prefix: '/echo' });
  done();
};
