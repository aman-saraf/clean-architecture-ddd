import morgan, { StreamOptions } from 'morgan';
import LOG from './logger';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => LOG.http(message)
};

const httpLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream
  //immediate: true
});

export default httpLogger;
