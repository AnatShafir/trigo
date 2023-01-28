const { connect, close, isConnected } = require('../src/connection');

const { msOptions } = require('./test-config');

describe('connect', () => {
  afterEach(async () => await close());

  it('Should connect to the message service', async () => {
    await connect(msOptions);
    expect(isConnected()).toBeTruthy();
  });

  it('Should throw an error when connecting fails', async () => {
    const falseOptions = { servers: 'Hello' };
    await expect(connect(falseOptions)).rejects.toThrow();
  });
});
