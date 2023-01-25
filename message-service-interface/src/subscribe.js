const { JSONCodec } = require('nats');

const { getConnection } = require('./connection');

const jc = JSONCodec();

module.exports = async (subject, handleMessage) => {
  const connection = getConnection();
  const subscription = connection?.subscribe(subject);
  for await (const message of subscription) {
    if (message.data) message.decodedData = jc.decode(message.data);
    if (message.reply) {
      message.encodeRespond = (response) => message.respond(jc.encode(response));
    }
    handleMessage(message);
  }
};
