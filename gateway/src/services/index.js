const log = require('./log/index');
const event = require('./event/index');

module.exports = (router) => {
  log(router);
  event(router);
};
