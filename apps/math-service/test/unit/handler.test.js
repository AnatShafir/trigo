/* eslint-disable global-require */
const { divideData, messageData, subtractData } = require('../test-data');
const calculate = require('../../src/calculate');

let handlers;
jest.isolateModules(() => {
  handlers = require('../../src/handler');
});
const { subtractHandler, divideHandler } = handlers;

const operations = [
  { operationName: 'divide', testData: divideData, handlerFunc: divideHandler },
  { operationName: 'subtract', testData: subtractData, handlerFunc: subtractHandler },
];

describe('handlers', () => {
  describe('validation error', () => {
    afterEach(() => jest.restoreAllMocks());

    it('Should reply with an error when a message is expecting a reply', () => {
      const messageObject = {
        subject: subtractData.subject,
        decodedData: {
          reqId: subtractData.expectedResponse.decodedData.reqId,
        },
        encodeRespond: jest.fn(),
      };

      subtractHandler(messageObject);
      const responseData = messageObject.encodeRespond.mock.lastCall[0];
      expect(responseData.payload.errors.length).toBeGreaterThan(0);
      expect(responseData.reqId).toBe(messageObject.decodedData.reqId);
    });

    it('Should not throw error when a message is not expecting a reply', () => {
      const messageObject = {
        subject: subtractData.subject,
      };
      jest.spyOn(calculate, 'subtract');
      const { subtractHandler: mockCalcHandler } = require('../../src/handler');
      mockCalcHandler(messageObject);
      expect(calculate.subtract).not.toBeCalled();
    });
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
