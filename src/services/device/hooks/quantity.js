const async = require('async');
const utils = require('../device.utils.js');

module.exports = function () {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;

    if (hook.type === 'before') {
      hook.data = {
        startDate: hook.params.query.startDate,
        endDate: hook.params.query.endDate,
      };

      delete hook.params.query.startDate;
      delete hook.params.query.endDate;
    } else {
      let devices = hook.result.data;

      for (let i = 0; i < devices.length; i++) {
        devices[i].availableQuantity = devices[i].quantity;
      }

      if (hook.data.startDate && hook.data.endDate) {
        const startDate = hook.data.startDate;
        const endDate = hook.data.endDate;

        devices = await utils.processQuantity(models, devices, startDate, endDate);

        return hook;
      }
    }
  };
};
