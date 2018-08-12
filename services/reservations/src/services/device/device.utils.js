const async = require('async');
const _ = require('lodash');
const reservation = require('../reservation/reservation.utils');

module.exports = {
  async processQuantity(models, devices, startDate, endDate) {
    const reservations = await models.reservation.findAll({
      where: reservation.overlaps(startDate, endDate),
      include: [{
        model: models.device,
      }],
    });

    for (let i = 0; i < reservations.length; i++) {
      for (let e = 0; e < reservations[i].devices.length; e++) {
        devices = this.subtractQuantity(devices, reservations[i].devices[e].id, reservations[i].devices[e].reservation_devices.quantity);
      }
    }

    return devices;
  },
  subtractQuantity(devices, id, quantity) {
    const device = _.find(devices, item => item.id === id);

    if (device) {
      device.availableQuantity = device.availableQuantity - quantity;
      
      if (device.availableQuantity < 0) {
        device.availableQuantity = 0;
      }
    }

    return devices;
  },
};
