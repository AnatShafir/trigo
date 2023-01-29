const payload = { firstNumber: 3, secondNumber: 1 };
const reqId = '1234';
const messageData = { payload, reqId };

const getSubject = (prefix) => `${prefix}${Math.random().toString(16)}`;

const divideData = {
  subject: getSubject('math.divide.'),
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
  subject: getSubject('math.subtract.'),
  expectedResponse: {
    decodedData: {
      reqId,
      payload: {
        result: payload.firstNumber - payload.secondNumber,
      },
    },
  },
};

module.exports = {
  getSubject, messageData, divideData, subtractData,
};
