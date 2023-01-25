const postSchema = {
  body: {
    type: 'object',
    required: ['firstNumber', 'secondNumber'],
    additionalProperties: false,
    properties: {
      firstNumber: { type: 'number' },
      secondNumber: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        result: { type: 'number' },
      },
    },
  },
};

const numbersExcludingZero = {
  type: 'number',
  anyOf: [
    { exclusiveMinimum: 0 },
    { exclusiveMaximum: 0 },
  ],
};

const divideSchema = { ...postSchema };
divideSchema.body.properties.secondNumber = numbersExcludingZero;

module.exports = { subtractSchema: postSchema, divideSchema };
