const { JSONCodec } = require('nats');

const messageRequest = require('../src/message-request');
const { getConnection } = require('../src/connection');
const msInterface = require('../src/index');
const { msOptions } = require('./test-config');
const { subject, data } = require('./test-data');

const jc = JSONCodec();

const consumeMessages = async (subscription, handleMessage) => {
  for await (const message of subscription) {
    handleMessage(message);
  }
};

describe('messageRequest', () => {
  beforeAll(async () => await msInterface.connect(msOptions));

  afterAll(async () => await msInterface.close());

  it('Should send a request message', async () => {
    const subscription = getConnection().subscribe(subject);

    const validateAndRespond = (message) => {
      expect(message.subject).toBe(subject);
      expect(jc.decode(message.data)).toStrictEqual(data);
      message.respond();
    };

    consumeMessages(subscription, validateAndRespond);
    await messageRequest(subject, data);
    await subscription.drain();
  });

  it('Should throw an error when the request message\'s subject has no responders', async () => {
    await expect(messageRequest(subject, data))
      .rejects.toThrow('This request has no responders');
  });
});
