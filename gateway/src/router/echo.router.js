const { getEcho } = require('../controller/echo.controller');
const { getSchema } = require('../schema/echo.schema');

module.exports = (app) => {
  app.get('/:message', { schema: getSchema, handler: getEcho });
};
