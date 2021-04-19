const bunyan = require('bunyan');

const { LoggingBunyan } = require('@google-cloud/logging-bunyan');
const loggingBunyan = new LoggingBunyan();

/**
 * @param {Object} config Logger configuration
 */
module.exports = config => {
  
  const logger = bunyan.createLogger({
    name: "urbano1",
    streams: [
      { stream: process.stdout, level: 'info' },
      loggingBunyan.stream('info'),
    ],
  });
  return logger;
};
