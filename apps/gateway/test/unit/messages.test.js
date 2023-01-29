const msInterface = require('message-service-interface');

const { divideMessage, subtractMessage } = require('../../src/messages/math.messages');
const { echoMessage } = require('../../src/messages/echo.messages');

const { divideData, subtractData, echoData } = require('../test-data');

const messageTypesByService = {
  math: [
    { typeName: 'divide', testData: divideData, testFunc: divideMessage },
    { typeName: 'subtract', testData: subtractData, testFunc: subtractMessage },
  ],
  echo: [
    { typeName: 'echo', testData: echoData, testFunc: echoMessage },
  ],
};
const services = Object.keys(messageTypesByService);

describe('messages - unit', () => {
  services.forEach((service) => {
    describe(`${service} service`, () => {
      messageTypesByService[service].forEach((messageType) => {
        const { typeName, testData, testFunc } = messageType;
        const { messageResponse, expectedMessageData, expectedSubject } = testData;
        const { payload, reqId } = expectedMessageData;

        describe(`${typeName} message`, () => {
          afterEach(() => jest.restoreAllMocks());

          it(`Should send ${typeName} message to the ${service} service and return the response`, async () => {
            jest.spyOn(msInterface, 'messageRequest').mockReturnValue(messageResponse);
            const result = await testFunc(...Object.values(payload), reqId);
            expect(result).toMatchObject(messageResponse);
            expect(msInterface.messageRequest).toBeCalledWith(expectedSubject, expectedMessageData);
          });
        });
      });
    });
  });
});
