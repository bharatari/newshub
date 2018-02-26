const app = require('./app');
const port = process.env.PORT || 3030;
const server = app.listen(port);

server.on('listening', () =>
  console.log(`NewsHub Gateway v${process.env.npm_package_version} started on port ${port}`)
);
