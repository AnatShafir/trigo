module.exports = {
  type: 'object',
  required: ['payload', 'reqId'],
  properties: {
    reqId: { type: 'string' },
    payload: {
      type: 'object',
      required: ['firstNumber', 'secondNumber'],
      properties: {
        firstNumber: { type: 'number' },
        secondNumber: { type: 'number' },
      },
    },
  },
};
