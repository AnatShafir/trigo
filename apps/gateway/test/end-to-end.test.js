const { start } = require('../src/service');
const app = require('../src/app');

describe('end to end', () => {
  it('Should subscribe to math messages', async () => {
    await start();
    await app.inject({
      method: 'POST',
      url: '/math/divide',
      payload: {
        firstNumber: 6,
        secondNumber: 2,
      },
    });
    // await expect(msInterface.messageRequest(subject, data))
    //   .resolves.toMatchObject(response);
  });
});
