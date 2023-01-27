/* eslint-disable global-require */
const messages = require('../../src/messages/echo.messages');
const { createMessageResponse, echoData } = require('../test-data');

const mockMessage = jest.spyOn(messages, 'echoMessage');
const app = require('../../src/app');

const { messageResponse, expectedMessageData } = echoData;
const request = {
  method: 'GET',
  url: `/echo/${expectedMessageData.payload.message}`,
};

describe('echo routes', () => {
  afterAll(() => jest.restoreAllMocks());

  describe('GET /echo/:message', () => {
    it('Should respond with status code 200 and the service\'s response', async () => {
      mockMessage.mockReturnValue(messageResponse);
      const response = await app.inject(request);
      expect(response.statusCode).toEqual(200);
      expect(response.json()).toEqual(messageResponse.decodedData.payload);
    });

    it('Should respond with status code 400 when the message service replies with an error', async () => {
      const mockResult = createMessageResponse({ errors: ['error message'] });
      mockMessage.mockReturnValue(mockResult);
      const response = await app.inject(request);
      expect(response.statusCode).toEqual(400);
      expect(response.json()).toEqual(mockResult.decodedData.payload);
    });

    it('Should respond with status code 502 when there is an error with the message service', async () => {
      const expectedResponse = { error: 'Bad Gateway' };
      mockMessage.mockReturnValue({});
      const response = await app.inject(request);
      expect(response.statusCode).toEqual(502);
      expect(response.json()).toEqual(expectedResponse);
    });
  });
});
