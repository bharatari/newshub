/* eslint-disable no-console */

if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}

const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('NewsHub Reservations v%s started on http://%s:%d', process.env.npm_package_version, app.get('host'), port)
);
