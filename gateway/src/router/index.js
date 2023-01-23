const mathRouter = require('./math.router');
const echoRouter = require('./echo.router');

module.exports = (app) => {
  app.register(mathRouter, { prefix: '/math' });
  app.register(echoRouter, { prefix: '/echo' });
};
