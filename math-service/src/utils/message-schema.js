const payloadSchema = {
  type: 'object',
  required: ['firstNumber', 'secondNumber'],
  properties: {
    firstNumber: { type: 'number' },
    secondNumber: { type: 'number' },
  },
};

const dataSchema = {
  type: 'object',
  required: ['payload', 'reqId'],
  properties: {
    reqId: { type: 'string' },
    payload: payloadSchema,
  },
};

const messageSchema = {
  type: 'object',
  required: ['subject', 'decodedData', 'encodeRespond'],
  properties: {
    subject: { type: 'string' },
    encodeRespond: { type: 'function' },
    decodedData: dataSchema,
  },
};

module.exports = messageSchema;
