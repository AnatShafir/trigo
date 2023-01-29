const { echoMessage } = require('../messages/echo.messages');

const getEcho = async (request, reply) => {
  const { message } = request.params;
  request.log.info('Sending message to echo service', { message });
  const response = await echoMessage(message, request.id);
  request.log.info('Received response from echo service', { response });

  const payload = response?.decodedData?.payload;
  if (payload?.message) return reply.code(200).send(payload);
  if (payload?.errors) return reply.code(400).send(payload);
  return reply.code(502).send({ error: 'Bad Gateway' });
};

module.exports = { getEcho };
