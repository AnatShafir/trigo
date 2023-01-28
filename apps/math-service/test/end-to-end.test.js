const msInterface = require('message-service-interface');

const { start } = require('../src/service');
const { messageData, subtractData: { subject, expectedResponse } } = require('./test-data');

describe('end to end', () => {
  afterEach(async () => msInterface.close());

  it('Should subscribe and handle messages', async () => {
    await start();
    const response = await msInterface.messageRequest(subject, messageData);
    expect(response).toMatchObject(expectedResponse);
  });

  it('Should respond with error when message isn\'t valid', async () => {
    const invalidData = { hello: 'hi' };
    await start();
    const response = await msInterface.messageRequest(subject, invalidData);
    const { errors } = response.decodedData.payload;
    expect(errors.length).toBeGreaterThan(0);
  });
});
