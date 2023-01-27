const mathPayload = { firstNumber: 6, secondNumber: 2 };
const echoPayload = { message: 'hello' };
const reqId = '1234';

const createMessageResponse = (payload) => ({ decodedData: { reqId, payload } });

const subtractData = {
  expectedSubject: `math.subtract.${mathPayload.firstNumber}.${mathPayload.secondNumber}`,
  expectedMessageData: { payload: mathPayload, reqId },
  result: mathPayload.firstNumber - mathPayload.secondNumber,
};
subtractData.messageResponse = createMessageResponse({ result: subtractData.result });

const divideData = {
  expectedSubject: `math.divide.${mathPayload.firstNumber}.${mathPayload.secondNumber}`,
  expectedMessageData: { payload: mathPayload, reqId },
  result: mathPayload.firstNumber / mathPayload.secondNumber,
};
divideData.messageResponse = createMessageResponse({ result: divideData.result });

const echoData = {
  expectedSubject: `echo.${echoPayload.message}`,
  expectedMessageData: { payload: echoPayload, reqId },
  result: echoPayload.message,
};
echoData.messageResponse = createMessageResponse({ message: echoData.result });

module.exports = {
  echoData, subtractData, divideData, createMessageResponse,
};
