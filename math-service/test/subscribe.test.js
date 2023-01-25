/* eslint-disable global-require */
const msInterface = require('message-service-interface');

const { messageData, subtractData: { subject } } = require('./test-data');
const { msOptions } = require('./test-config');
const handlers = require('../src/handler');

const mockHandlers = () => {
  const mockExpectedResponse = { good: 'right handler' };
  const mockUnwantedResponse = { error: 'wrong handler' };
  const mockSubtractHandler = (message) => message.encodeRespond(mockExpectedResponse);
  const mockDivideHandler = (message) => message.encodeRespond(mockUnwantedResponse);
  jest.spyOn(handlers, 'subtractHandler').mockImplementation(mockSubtractHandler);
  jest.spyOn(handlers, 'divideHandler').mockImplementation(mockDivideHandler);
  return mockExpectedResponse;
};

describe('subscribe', () => {
  beforeAll(async () => msInterface.connect(msOptions));

  afterEach(() => jest.restoreAllMocks());

  afterAll(async () => msInterface.close());

  it('Should subscribe to math messages and call the relevant handlers', async () => {
    const mockExpectedResponse = mockHandlers();
    const subscribe = require('../src/subscribe');

    subscribe();

    const response = await msInterface.messageRequest(subject, messageData);
    expect(response.decodedData).toStrictEqual(mockExpectedResponse);
    expect(handlers.divideHandler).not.toBeCalled();
  });
});
