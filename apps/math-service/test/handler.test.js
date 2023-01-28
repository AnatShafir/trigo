const msInterface = require('message-service-interface');

const { divideData, messageData, subtractData } = require('./test-data');
const { divideHandler, subtractHandler } = require('../src/handler');
const { msOptions } = require('./test-config');

const operations = [
  { operationName: 'divide', testData: divideData, handlerFunc: divideHandler },
  { operationName: 'subtract', testData: subtractData, handlerFunc: subtractHandler },
];

describe('handlers', () => {
  beforeAll(async () => msInterface.connect(msOptions));

  afterAll(async () => msInterface.close());

  it('Should respond with error when message is missing required properties', () => {
    const messageObject = {
      subject: subtractData.subject,
      encodeRespond: jest.fn(),
    };

    subtractHandler(messageObject);
    const responseData = messageObject.encodeRespond.mock.lastCall[0];
    expect(responseData.payload.errors.length).toBeGreaterThan(0);
  });

  operations.forEach((operation) => {
    const { operationName, testData, handlerFunc } = operation;

    describe(`${operationName}`, () => {
      it(`Should handle ${operationName} messages`, () => {
        const { subject, expectedResponse } = testData;
        const messageObject = {
          subject,
          decodedData: messageData,
          encodeRespond: jest.fn(),
        };

        handlerFunc(messageObject);
        expect(messageObject.encodeRespond).toBeCalledWith(expectedResponse.decodedData);
      });
    });
  });
});
