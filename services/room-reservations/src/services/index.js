const building = require('./building/building.service.js');
const room = require('./room/room.service.js');
const reservation = require('./reservation/reservation.service.js');
module.exports = function (app) {
  app.configure(building);
  app.configure(room);
  app.configure(reservation);
};
