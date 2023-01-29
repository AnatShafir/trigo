/* eslint-disable global-require */
const msInterface = require('message-service-interface');

const { messageData, subject } = require('../test-data');
const { msOptions } = require('../../src/config');
const handlers = require('../../src/handler');

const mockExpectedResponse = { handler: 'echo' };
const mockEchoHandler = (message) => message.encodeRespond(mockExpectedResponse);
jest.spyOn(handlers, 'echoHandler').mockImplementation(mockEchoHandler);

const subscribe = require('../../src/subscribe');

describe('subscribe', () => {
  beforeAll(async () => { await msInterface.connect(msOptions); });

  afterAll(async () => {
    jest.restoreAllMocks();
    await msInterface.close();
  });

  it('Should subscribe to echo messages and call the relevant handler', async () => {
    subscribe();
    const response = await msInterface.messageRequest(subject, messageData);
    expect(response.decodedData).toStrictEqual(mockExpectedResponse);
  });
});
