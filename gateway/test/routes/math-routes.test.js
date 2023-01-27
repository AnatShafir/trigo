/* eslint-disable global-require */
const messages = require('../../src/messages/math.messages');
const { createMessageResponse, divideData, subtractData } = require('../test-data');

const routes = [
  {
    routeName: 'divide',
    method: 'POST',
    testData: divideData,
    mockMessage: jest.spyOn(messages, 'divideMessage'),
  },
  {
    routeName: 'subtract',
    method: 'POST',
    testData: subtractData,
    mockMessage: jest.spyOn(messages, 'subtractMessage'),
  },
];

const app = require('../../src/app');

describe('math routes', () => {
  afterAll(() => jest.restoreAllMocks());

  routes.forEach((routeInfo) => {
    const {
      routeName, method, testData, mockMessage,
    } = routeInfo;
    const { messageResponse, expectedMessageData } = testData;
    const request = {
      method,
      url: `/math/${routeName}`,
      payload: expectedMessageData.payload,
    };

    describe(`${method} ${request.url}`, () => {
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
});
