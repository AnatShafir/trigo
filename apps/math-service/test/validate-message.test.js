const validateMessage = require('../src/utils/validate-message');
const { messageData, subtractData: { subject } } = require('./test-data');

describe('validate messages', () => {
  it('Should validate a valid message', async () => {
    const messageObject = {
      subject,
      decodedData: messageData,
      encodeRespond: () => {},
    };

    expect(validateMessage(messageObject)).toEqual([]);
  });

  it('Should return an error when message is missing decodedData property', async () => {
    const expectedError = 'Message should have decodedData property';
    const messageObject = {
      subject,
      encodeRespond: () => {},
    };

    const validationErrors = validateMessage(messageObject);
    expect(validationErrors[0]).toEqual(expectedError);
  });

  it('Should return an error when message\'s decodedData isn\'t valid', async () => {
    const invalidData = { ...messageData };
    delete invalidData.payload;
    const expectedError = 'must have required property \'payload\'';
    const messageObject = {
      subject,
      decodedData: invalidData,
      encodeRespond: () => {},
    };

    const validationErrors = validateMessage(messageObject);
    expect(validationErrors[0]).toEqual(expectedError);
  });

  it('Should return an error when a message is missing encodeRespond property', async () => {
    const expectedError = 'Message should have encodeRespond property';
    const messageObject = {
      subject,
      decodedData: messageData,
    };

    const validationErrors = validateMessage(messageObject);
    expect(validationErrors[0]).toEqual(expectedError);
  });
});
