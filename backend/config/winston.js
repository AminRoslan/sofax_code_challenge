const winston = require('winston');

const { createLogger, format, transports } = winston;

const consoleTransport = new transports.Console({
  level: 'info',
  handleExceptions: true,
  json: true,
  colorize: true,
});

consoleTransport.on('info', (data) => {
  console.log(`info data : ${data}`);
});

consoleTransport.on('finish', (data) => {
  console.log(`finish data : ${data}`);
});

const myFormat = format.printf(
  ({ level, message, timestamp }) => `${timestamp} : ${level} : ${message}`
);

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint(),
    myFormat
  ),
  transports: [consoleTransport],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    logger.info(`encoding : ${encoding}`);
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(`message : ${message}`);
  },
};
logger.info('Log Begin....');

module.exports = logger;
