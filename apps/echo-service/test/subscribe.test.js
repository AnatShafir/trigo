/* eslint-disable global-require */
const msInterface = require('message-service-interface');

const { messageData, subject } = require('./test-data');
const { msOptions } = require('./test-config');
const handlers = require('../src/handler');

describe('subscribe', () => {
  beforeAll(async () => msInterface.connect(msOptions));

  afterEach(() => jest.restoreAllMocks());

  afterAll(async () => msInterface.close());

  it('Should subscribe to echo messages and call the relevant handler', async () => {
    const mockExpectedResponse = { handler: 'echo' };
    const mockEchoHandler = (message) => message.encodeRespond(mockExpectedResponse);
    jest.spyOn(handlers, 'echoHandler').mockImplementation(mockEchoHandler);
    const subscribe = require('../src/subscribe');

    subscribe();

    const response = await msInterface.messageRequest(subject, messageData);
    expect(response.decodedData).toStrictEqual(mockExpectedResponse);
  });
});
