const _ = require('lodash');
const request = require('request-promise-native');
const querystring = require('querystring');

module.exports = {
  /**
   * Checks if user has permission to use given service and method.
   *
   * @public
   * @param {Object} models - Sequelize models
   * @param {string} userId
   * @param {string} service - Name of Feathers service
   * @param {string} method
   * @returns {Promise}
   */
  async can(authorization, service, method, property, id) {
    const query = {
      service,
      method,
      property,
      id,
    };

    const qstring = querystring.stringify(query);

    try {
      const can = await request.get({
        url: `/api/role?${qstring}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': authorization,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Checks if user has the specific given permission. Used by
   * the can function and also can be used for checking
   * and custom permissions.
   * 
   * @public
   */
  async has(authorization, permission, model, id) {
    const query = {
      permission,
      model,
      id
    };

    const qstring = querystring.stringify(query);

    try {
      const has = await request.get({
        url: `/api/role?${qstring}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': authorization,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Checks if user has the specified role.
   * 
   * @public
   */
  async is(authorization, role) {
    const query = {
      role,
    };

    const qstring = querystring.stringify(query);

    try {
      const is = await request.get({
        url: `/api/role?${qstring}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': authorization,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  },
};
