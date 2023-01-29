const payload = { firstNumber: 3, secondNumber: 1 };
const reqId = '1234';
const messageData = { payload, reqId };

const divideData = {
  subject: `math.divide.${payload.firstNumber}.${payload.secondNumber}`,
  expectedResponse: {
    decodedData: {
      reqId,
      payload: {
        result: payload.firstNumber / payload.secondNumber,
      },
    },
  },
};

const subtractData = {
  subject: `math.subtract.${payload.firstNumber}.${payload.secondNumber}`,
  expectedResponse: {
    decodedData: {
      reqId,
      payload: {
        result: payload.firstNumber - payload.secondNumber,
      },
    },
  },
};

module.exports = { messageData, divideData, subtractData };
