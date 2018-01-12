const app = require('./app');
const port = process.env.PORT || 3030;
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Gateway started on port ${port}`)
);
