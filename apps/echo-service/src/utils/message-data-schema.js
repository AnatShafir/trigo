module.exports = {
  type: 'object',
  required: ['payload', 'reqId'],
  properties: {
    reqId: { type: 'string' },
    payload: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
