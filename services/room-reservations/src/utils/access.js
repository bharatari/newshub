const _ = require('lodash');

module.exports = {
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
  can(roles, model, method, property) {
    if (!_.isEmpty(property)) {
      const permission = `${model}:${method}:${property}`;
      const denyPermission = this.createDenyPermission(permission);

      const upperPermission = `${model}:${method}`;
      const denyUpperPermission = this.createDenyPermission(upperPermission);
    
      if (_.includes(roles, permission)) {
        if (!_.includes(roles, denyPermission)) {
          return true;
        }

        return false;
      } else if (_.includes(roles, upperPermission)) {
        if (!_.includes(roles, denyUpperPermission) && !_.includes(roles, denyPermission)) {
          return true;
        }

        return false;
      }

      return false;
    } else {
      return this.has(`${model}:${method}`)
    }
  },
  createDenyPermission(permission) {
    return `deny!${permission}`;
  },
}
