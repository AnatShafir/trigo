const Ajv = require('ajv');

const dataSchema = require('./message-data-schema');

const avg = new Ajv();
const validateData = avg.compile(dataSchema);

const validateMessage = (message) => {
  let errors = [];
  if (!message.decodedData) errors.push(new Error('Message should have decodedData property'));
  else if (!validateData(message.decodedData)) errors = errors.concat(validateData.errors);
  if (!message.encodeRespond) errors.push(new Error('Message should have encodeRespond property'));
  return errors;
};

module.exports = validateMessage;
