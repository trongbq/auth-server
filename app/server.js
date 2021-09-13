import http from 'http';
import app, { init as appInit, close as appClose } from './app';
import config from './lib/config';
import logger from './lib/logger';

const server = http.createServer(app);

function onError(port) {
  return (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
}

function onTerminated() {
  logger.info('Terminate signal received: closing HTTP server');
  server.close(() => {
    logger.info('Server is closed!');
    appClose().then(() => {
      logger.info('App is closed! exiting...');
      process.exit(1);
    });
  });
}

appInit().then(() => {
  server.listen(config.port);
  server.on('error', onError(config.port));
  server.on('listening', onListening);

  if (config.env === 'production') {
    process.on('SIGTERM', onTerminated);
    process.on('SIGINT', onTerminated);
  }
});
