const event = require('./event/event.service.js');
const log = require('./log/log.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(event);
  app.configure(log);
};
