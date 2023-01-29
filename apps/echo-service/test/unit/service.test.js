const msInterface = require('message-service-interface');

jest.spyOn(process, 'exit').mockImplementation(() => {});
const { handleSignal, handleFatalError } = require('../../src/service');

describe('service - unit', () => {
  describe('shut down', () => {
    afterEach(() => process.exit.mockClear());

    afterAll(() => jest.restoreAllMocks());

    it('Should handle a termination signal and shut down', async () => {
      await handleSignal('SIGTERM');
      expect(process.exit).toBeCalledWith(0);
    });

    it('Should handle a fatal error and shut down', async () => {
      await handleFatalError(new Error('fatal error'));
      expect(process.exit).toBeCalledWith(0);
    });

    it('Should handle an error in the shut down process', async () => {
      const throwError = () => { throw new Error('shut down error'); };
      jest.spyOn(msInterface, 'isConnected').mockImplementation(throwError);
      await handleFatalError(new Error('fatal error'));
      expect(process.exit).toBeCalledWith(1);
    });
  });
});
