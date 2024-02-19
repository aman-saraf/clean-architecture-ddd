import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  http: 2,
  info: 3,
  debug: 4
};

const level = () => {
  const env = process.env.ENV || 'development';
  const isProduction = env === 'production';
  return isProduction ? 'info' : 'info';
};

const format = winston.format.combine(
  winston.format.splat(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const errorFileTransport = new DailyRotateFile({
  filename: 'logs/error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '30d',
  level: 'error'
});

const allFileTransport = new DailyRotateFile({
  filename: 'logs/all.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '30d',
  level: 'info'
});

const transports = [new winston.transports.Console(), errorFileTransport, allFileTransport];

const LOG = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

export default LOG;
