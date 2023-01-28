const { getEcho } = require('../controller/echo.controller');
const { getSchema } = require('../schema/echo.schema');

module.exports = (app, _, done) => {
  app.get('/:message', { schema: getSchema, handler: getEcho });
  done();
};
