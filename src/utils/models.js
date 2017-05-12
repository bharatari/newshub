const Sequelize = require('sequelize');

module.exports = {
  reservationDevices(sequelize) {
    return sequelize.define('reservation_devices', {
      quantity: Sequelize.INTEGER,
    });
  },
  organizationUser(sequelize) {
    return sequelize.define('organization_user');
  },
  organizationRoomReservation(sequelize) {
    return sequelize.define('organization_roomReservation');
  },
  organizationReservation(sequelize) {
    return sequelize.define('organization_reservation');
  },
  organizationDevice(sequelize) {
    return sequelize.define('organization_device');
  },
  organizationRoom(sequelize) {
    return sequelize.define('organization_room');
  },
  organizationBuilding(sequelize) {
    return sequelize.define('organization_building');
  }
};
