const request = require('request-promise-native');
const querystring = require('querystring');
const errors = require('feathers-errors');

module.exports = function (options) {
  return async function (hook) {
    hook.params.user = {
      currentOrganizationId: hook.params.headers['newshub-organization-id'],
      id: hook.params.headers['newshub-user-id'],
    };

    const query = {
      service: options.service,
      method: hook.method,
    };

    const qstring = querystring.stringify(query);

    try {
      const can = await request.get({
        url: `http://gateway:8080/api/role?${qstring}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': hook.params.headers['authorization'],
        },
      });

      return hook;
    } catch (e) {
      throw new errors.Forbidden();
    }
  };
};
