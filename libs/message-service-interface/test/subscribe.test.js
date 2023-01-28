const { JSONCodec } = require('nats');

const subscribe = require('../src/subscribe');
const { getConnection } = require('../src/connection');
const msInterface = require('../src/index');
const { msOptions } = require('./test-config');
const { subject, data } = require('./test-data');

const jc = JSONCodec();

describe('subscribe', () => {
  beforeAll(async () => await msInterface.connect(msOptions));

  afterAll(async () => await msInterface.close());

  it('Should consume a message', async () => {
    const handleMessage = (message) => {
      expect(message.subject).toBe(subject);
      expect(message.decodedData).toStrictEqual(data);
      message.respond();
    };

    subscribe(subject, handleMessage);
    await getConnection().request(subject, jc.encode(data));
  });
});
