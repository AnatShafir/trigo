const msInterface = require('message-service-interface');

const { msOptions } = require('../../src/config');
const { messageData, subtractData: { expectedResponse, subject } } = require('../test-data');

jest.spyOn(process, 'exit').mockImplementation(() => {});
const { start, handleFatalError } = require('../../src/service');

describe('service - integration', () => {
  afterAll(() => jest.restoreAllMocks());

  describe('start', () => {
    afterEach(async () => { await msInterface.close(); });

    it('Should subscribe and handle math messages', async () => {
      await start();
      const response = await msInterface.messageRequest(subject, messageData);
      expect(response).toMatchObject(expectedResponse);
    });

    it('Should subscribe and handle invalid messages', async () => {
      const invalidData = { hello: 'hi' };
      await start();
      const response = await msInterface.messageRequest(subject, invalidData);
      const { errors } = response.decodedData.payload;
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('shut down', () => {
    afterEach(async () => process.exit.mockClear());

    it('Should close open connections', async () => {
      await msInterface.connect(msOptions);
      await handleFatalError(new Error('fatal error'));
      expect(process.exit).toBeCalledWith(0);
      expect(msInterface.isConnected()).toBe(false);
    });
  });
});
