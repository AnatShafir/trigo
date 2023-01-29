const { JSONCodec, StringCodec } = require('nats');

const subscribe = require('../src/subscribe');
const { connect, close, getConnection } = require('../src/connection');
const { msOptions } = require('./test-config');
const { subject, data } = require('./test-data');

const jc = JSONCodec();
let subscription;
let connection;

describe('subscribe', () => {
  beforeAll(async () => {
    await connect(msOptions);
    connection = getConnection();
  });

  afterEach(async () => {
    await subscription?.drain();
    subscription = null;
  });

  afterAll(async () => await close());

  it('Should call handle message when getting a message', async () => {
    const handleMessage = jest.fn((message) => message.respond());
    subscription = subscribe(subject, handleMessage);
    await connection.request(subject);
    expect(handleMessage).toBeCalled();
  });

  it('Should decode data when getting a message with data', async () => {
    expect.assertions(1);
    const handleMessage = (message) => expect(message.decodedData).toStrictEqual(data);
    subscription = subscribe(subject, handleMessage);
    connection.publish(subject, jc.encode(data));
  });

  it('Should supply encodeRespond function when a message expects a reply', async () => {
    const handleMessage = (message) => message.encodeRespond(data);
    subscription = subscribe(subject, handleMessage);
    const response = await connection.request(subject, jc.encode(data));
    expect(jc.decode(response.data)).toStrictEqual(data);
  });

  describe('invalid JSON', () => {
    const sc = StringCodec();
    const invalidJson = sc.encode('bad json');

    it('Should reply with an error when a message is expecting a reply', async () => {
      const handleMessage = jest.fn();
      subscription = subscribe(subject, handleMessage);
      const response = await connection.request(subject, invalidJson);
      const decodedData = jc.decode(response.data);
      expect(decodedData.code).toBe('BAD_JSON');
      expect(handleMessage).not.toBeCalled();
    });

    it('Should not throw error when a message is not expecting a reply', async () => {
      const handleMessage = () => { throw new Error('Called handleMessage'); };
      subscription = subscribe(subject, handleMessage);
      connection.publish(subject, invalidJson);
    });
  });
});
