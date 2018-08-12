const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return function (hook) {
    if (hook.method === 'patch') {
      delete hook.data.user;
      delete hook.data.approvedBy;
    }

    return hook;
  };
};
