'use strict';

const utils = require('../reservation.utils');
const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return function (hook) {
    if (hook.method === 'create') {
      if (hook.data.startDate >= hook.data.endDate) {
        throw new errors.BadRequest('Start date cannot be after end date');
      } else {
        return hook;
      }
    } else if (hook.params.query.startDate && hook.params.query.endDate) {
      if (hook.params.query.startDate >= hook.params.query.endDate) {
        throw new errors.BadRequest('Start date cannot be after end date');
      } else {
        return hook;
      }
    } else {
      return hook;
    }
  };
};
