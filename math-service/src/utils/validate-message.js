const Ajv = require('ajv');

const messageSchema = require('./message-schema');

const validateMessage = new Ajv().compile(messageSchema);

module.exports = validateMessage;
