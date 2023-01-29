/* eslint-disable global-require */
const config = require('../../src/config');

describe('logger', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Should get the log level from config', () => {
    jest.replaceProperty(config, 'logLevel', 'info');
    const logger = require('../../src/utils/logger');
    expect(logger.level).toBe('info');
    logger.info('test', {});
    logger.info('test');
  });
});
