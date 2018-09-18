const reservation = require('./reservation/reservation.service.js');
const device = require('./device/device.service.js');

const action = require('./action/action.service.js');

module.exports = function (app) {
  app.configure(reservation);
  app.configure(device);
  app.configure(action);
};
