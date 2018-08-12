const request = require('request-promise-native');
const querystring = require('querystring');
const errors = require('@feathersjs/errors');
const access = require('../utils/access');

module.exports = function (options) {
  return async function (hook) {
    try {
      const authorization = hook.params.headers['authorization'];
      const userId = hook.params.headers['newshub-user-id'];

      // TODO: Pass from gateway
      // hook.params.user = await data.getUser(authorization, userId);
      hook.params.authorization = authorization;
  
      // TODO: Pass expanded roles from gateway
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
