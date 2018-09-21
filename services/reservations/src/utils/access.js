const _ = require('lodash');
const request = require('request-promise-native');
const querystring = require('querystring');

module.exports = {
  // TODO: Support owner checks with object IDs
  has(roles, role) {
    if (_.includes(roles, 'master')) {
      return true;
    } else if (role) {
      if (_.includes(roles, role)) {
        if (_.includes(roles, this.createDenyPermission(role))) {
          return false;
        }

        return true;
      }

      return false;
    } else {
      return true;
    }
  },
  can(roles, model, method, property, id) {
    if (!_.isEmpty(property)) {
      const permission = `${model}:${method}:${property}`;
      const upperPermission = `${model}:${method}`;
    
      if (this.has(roles, permission)) {
        return true;
      } else if (this.has(roles, upperPermission)) {
        const denyPermission = this.createDenyPermission(permission);

        if (!_.includes(roles, denyPermission)) {
          return true;
        }

        return false;
      }

      return false;
    } else {
      return this.has(roles, `${model}:${method}`)
    }
  },
  createDenyPermission(permission) {
    return `deny!${permission}`;
  },
};
