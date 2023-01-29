const msInterface = require('message-service-interface');

const { divideData: { result, expectedMessageData: { payload } } } = require('../test-data');
const app = require('../../src/app');

jest.spyOn(process, 'exit').mockImplementation(() => {});
const { start, handleFatalError } = require('../../src/service');

const request = {
  method: 'POST',
  url: '/math/divide',
  payload,
};

describe('service - integration', () => {
  beforeAll(async () => { await start(); });

  afterAll(async () => {
    jest.restoreAllMocks();
    if (msInterface.isConnected()) await msInterface.close();
    if (app.server.address()) await app.close();
  });

  describe('start', () => {
    it('Should handle requests', async () => {
      const response = await app.inject(request);
      expect(response.json()).toStrictEqual({ result });
    });

    it('Should handle invalid requests', async () => {
      const invalidRequest = { ...request };
      invalidRequest.payload = { hello: 'hi' };
      const response = await app.inject(invalidRequest);
      expect(response.json()).toMatchObject({ error: 'Bad Request' });
    });
  });

  describe('shut down', () => {
    it('Should close open connections', async () => {
      await handleFatalError(new Error('fatal error'));
      expect(process.exit).toBeCalledWith(0);
      expect(msInterface.isConnected()).toBe(false);
      expect(app.server.address()).toBeNull();
    });
  });
});
