const winston = require('winston');
const { format } = require('logform');

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: 'debug',
  // https://github.com/winstonjs/logform.
  format: alignedWithColorsAndTime,
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
    }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
