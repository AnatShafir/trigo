const { JSONCodec } = require('nats');

const messageRequest = require('../src/message-request');
const { getConnection } = require('../src/connection');
const msInterface = require('../src/index');
const { msOptions } = require('./test-config');
const { subject, data } = require('./test-data');

const jc = JSONCodec();
let subscription;

const consumeMessages = async (handleMessage) => {
  for await (const message of subscription) {
    handleMessage(message);
  }
};

describe('messageRequest', () => {
  beforeAll(async () => await msInterface.connect(msOptions));

  afterEach(async () => {
    await subscription?.drain();
    subscription = null;
  });

  afterAll(async () => await msInterface.close());

  it('Should send a request message', async () => {
    subscription = getConnection().subscribe(subject);

    const validateAndRespond = (message) => {
      expect(message.subject).toBe(subject);
      expect(jc.decode(message.data)).toStrictEqual(data);
      message.respond();
    };

    consumeMessages(validateAndRespond);
    await messageRequest(subject, data);
  });

  it('Should send a request message and get response with decoded data', async () => {
    subscription = getConnection().subscribe(subject);
    consumeMessages((message) => message.respond(message.data));

    const response = await messageRequest(subject, data);
    expect(response.decodedData).toStrictEqual(data);
  });

  it('Should throw an error when the request message\'s subject has no responders', async () => {
    await expect(messageRequest(subject, data))
      .rejects.toThrow('No responders');
  });
});
