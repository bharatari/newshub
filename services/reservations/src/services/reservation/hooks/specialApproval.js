'use strict';

const utils = require('../reservation.utils');
const errors = require('@feathersjs/errors');
const _ = require('lodash');

module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;
    const devices = [];

    // Get devices from database, don't trust
    // data coming from client
    for (let i = 0; i < hook.params.devices.length; i++) {
      const device = await models.device.findOne({
        where: {
          id: hook.params.devices[i].id,
        },
      });

      devices.push(device);
    }
    
    const specialApprovals = _.map(devices, 'specialApproval');

    _.remove(specialApprovals, function(n) {
      return n == null;
    });
    
    if (specialApprovals.length > 0) {
      const first = specialApprovals[0];

      const result = array.every((element) => {
        return element === first;
      });

      if (!result) {
        throw new errors.BadRequest('Multiple special approval devices in same reservation (with different required permission/role).');
      }
    }

    return hook;
  };
};
