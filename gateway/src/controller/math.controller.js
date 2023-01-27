const { subtractMessage, divideMessage } = require('../messages/math.messages');

const mathController = (operation, messageService) => async (request, reply) => {
  const { firstNumber, secondNumber } = request.body;
  request.log.info(`Sending message to ${operation} service`, { firstNumber, secondNumber });
  const response = await messageService(firstNumber, secondNumber, request.id);
  request.log.info(`Received response from ${operation} service`, { response });

  const payload = response?.decodedData?.payload;
  if (payload?.result) return reply.code(200).send(payload);
  if (payload?.errors) return reply.code(400).send(payload);
  return reply.code(502).send({ error: 'Bad Gateway' });
};

const postSubtract = mathController('subtract', subtractMessage);

const postDivide = mathController('divide', divideMessage);

module.exports = { postSubtract, postDivide };
