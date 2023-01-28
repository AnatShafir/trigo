const { postSubtract, postDivide } = require('../controller/math.controller');
const { subtractSchema, divideSchema } = require('../schema/math.schema');

module.exports = (app, _, done) => {
  app.post('/subtract', { schema: subtractSchema, handler: postSubtract });
  app.post('/divide', { schema: divideSchema, handler: postDivide });
  done();
};
