/* eslint-disable global-require */
const EventEmitter = require('events');
const nats = require('nats');

describe('connection emitter', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Should emit an error when the connection closed with error', async () => {
    const closeError = new Error('Close connection error');
    const expectedErrorMessage = 'Connection closed with error';
    const closeEventEmitter = new EventEmitter();
    const mockConnection = {
      drain: () => {},
      closed: async () => new Promise((resolve) => {
        closeEventEmitter.on('closeWithError', resolve(closeError));
      }),
    };
    jest.spyOn(nats, 'connect').mockReturnValue(mockConnection);
    const { connect } = require('../src/connection');

    expect.assertions(2);
    const connectionEmitter = await connect();
    connectionEmitter.on('error', (error) => {
      expect(error.message).toBe(expectedErrorMessage);
      expect(error.cause.message).toBe(closeError.message);
    });
    closeEventEmitter.emit('closeWithError');
  });
});
