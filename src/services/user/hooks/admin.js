'use strict';

const user = require('../../user/utils');
const errors = require('feathers-errors');
const moment = require('moment');

module.exports = function (options) {
  return function (hook) {
    // Skip hook if internal call
    if (hook.params.provider) {
      if (hook.id == hook.params.user.id) {
        return hook;
      } else if (user.isAdmin(hook.params.user)) {
        return hook;
      } else {
        throw new errors.NotAuthenticated('Must own this user or be an admin user.');
      }
    }
  };
};
