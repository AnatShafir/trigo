const { JSONCodec } = require('nats');

const { getConnection } = require('./connection');

const jc = JSONCodec();

const getMessages = async (subscription, handleMessage) => {
  for await (const message of subscription) {
    try {
      if (message.reply) {
        message.encodeRespond = (response) => message.respond(jc.encode(response));
      }
      if (message?.data?.length) message.decodedData = jc.decode(message.data);
      handleMessage(message);
    } catch (error) {
      if (error.code === 'BAD_JSON' && message.reply) message.encodeRespond(error);
    }
  }
};

const subscribe = (subject, handleMessage) => {
  const connection = getConnection();
  const subscription = connection?.subscribe(subject);
  getMessages(subscription, handleMessage);
  return subscription;
};

module.exports = subscribe;
