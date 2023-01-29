const Ajv = require('ajv');

const dataSchema = require('./message-data-schema');

const avg = new Ajv();
const validateData = avg.compile(dataSchema);

const validateMessage = (message) => {
  const errors = [];
  if (!message.decodedData) errors.push('Message should have decodedData property');
  else if (!validateData(message.decodedData)) {
    validateData.errors.forEach((err) => errors.push(err.message));
  }
  if (!message.encodeRespond) errors.push('Message should have encodeRespond property');
  return errors;
};

module.exports = validateMessage;
