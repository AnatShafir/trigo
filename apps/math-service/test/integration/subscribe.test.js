const msInterface = require('message-service-interface');

const { messageData, getSubject } = require('../test-data');
const { msOptions } = require('../../src/config');
const handlers = require('../../src/handler');

const subject = getSubject('math.subtract.');
const mockExpectedResponse = { handler: 'expected' };
const mockSubtractHandler = (message) => message.encodeRespond(mockExpectedResponse);
jest.spyOn(handlers, 'subtractHandler').mockImplementation(mockSubtractHandler);
jest.spyOn(handlers, 'divideHandler');

const subscribe = require('../../src/subscribe');

describe('subscribe', () => {
  beforeAll(async () => { await msInterface.connect(msOptions); });

  afterAll(async () => {
    jest.restoreAllMocks();
    await msInterface.close();
  });

  it('Should subscribe to math messages and call the relevant handlers', async () => {
    subscribe();
    const response = await msInterface.messageRequest(subject, messageData);
    expect(response.decodedData).toStrictEqual(mockExpectedResponse);
    expect(handlers.divideHandler).not.toBeCalled();
  });
});
