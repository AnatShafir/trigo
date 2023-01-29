const { subject, messageData } = require('../test-data');
const { echoHandler } = require('../../src/handler');

describe('handler', () => {
  describe('validation error', () => {
    it('Should reply with an error when a message is expecting a reply', () => {
      const messageObject = {
        subject,
        decodedData: {
          reqId: messageData.reqId,
        },
        encodeRespond: jest.fn(),
      };

      echoHandler(messageObject);
      const responseData = messageObject.encodeRespond.mock.lastCall[0];
      expect(responseData.payload.errors.length).toBeGreaterThan(0);
      expect(responseData.reqId).toBe(messageObject.decodedData.reqId);
    });

    it('Should not throw error when a message is not expecting a reply', () => {
      const messageObject = { subject };
      expect(() => { echoHandler(messageObject); }).not.toThrow();
    });
  });

  it('Should handle echo messages', () => {
    const messageObject = {
      subject,
      decodedData: messageData,
      encodeRespond: jest.fn(),
    };

    echoHandler(messageObject);
    expect(messageObject.encodeRespond).toBeCalledWith(messageData);
  });
});
