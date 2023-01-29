const msInterface = require('message-service-interface');

const { divideMessage, subtractMessage } = require('../../src/messages/math.messages');
const { echoMessage } = require('../../src/messages/echo.messages');
const { divideData, subtractData, echoData } = require('../test-data');
const { msOptions } = require('../../src/config');

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

describe('messages - integration', () => {
  beforeAll(async () => { await msInterface.connect(msOptions); });

  afterAll(async () => { await msInterface.close(); });

  services.forEach((service) => {
    describe(`${service} service`, () => {
      messageTypesByService[service].forEach((messageType) => {
        const { typeName, testData, testFunc } = messageType;
        const { messageResponse, expectedMessageData } = testData;
        const { payload, reqId } = expectedMessageData;

        describe(`${typeName} message`, () => {
          it(`Should send ${typeName} message to the ${service} service and return the response`, async () => {
            const result = await testFunc(...Object.values(payload), reqId);
            expect(result).toMatchObject(messageResponse);
          });
        });
      });
    });
  });
});
