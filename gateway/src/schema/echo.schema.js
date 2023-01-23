const getSchema = {
  params: {
    type: 'object',
    required: ['message'],
    properties: {
      message: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'string',
    },
  },
};

module.exports = { getSchema };
