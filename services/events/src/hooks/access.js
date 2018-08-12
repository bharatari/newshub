const request = require('request-promise-native');
const querystring = require('querystring');
const errors = require('@feathersjs/errors');
const access = require('../utils/access');
const data = require('../utils/data');

module.exports = function (options) {
  return async function (hook) {
    try {
      const authorization = hook.params.headers['authorization'];
      const userId = hook.params.headers['newshub-user-id'];

      hook.params.user = await data.getUser(authorization, userId);
      hook.params.authorization = authorization;
  
      const can = await access.can(hook.params.authorization, options.service, hook.method);
      
      if (can) {
        return hook;
      } else {
        throw new errors.Forbidden();
      }
    } catch (e) {
      if (e.statusCode === 401) {
        throw new errors.NotAuthenticated(e);
      } else {
        throw e;
      }
    }
  };
};
