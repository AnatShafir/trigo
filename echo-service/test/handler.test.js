const msInterface = require('message-service-interface');

const { subject, messageData } = require('./test-data');
const { echoHandler } = require('../src/handler');
const { msOptions } = require('./test-config');

describe('handler', () => {
  beforeAll(async () => msInterface.connect(msOptions));

  afterAll(async () => msInterface.close());

  it('Should respond with error when message is missing required properties', () => {
    const messageObject = {
      subject,
      encodeRespond: jest.fn(),
    };

    echoHandler(messageObject);
    const responseData = messageObject.encodeRespond.mock.lastCall[0];
    expect(responseData.payload.errors.length).toBeGreaterThan(0);
  });

  it('Should handle echo messages', () => {
    const messageObject = {
      subject,
      decodedData: messageData,
      encodeRespond: jest.fn(),
    };

    echoHandler(messageObject);
    expect(messageObject.encodeRespond).toBeCalledWith(messageData);
  });
});
