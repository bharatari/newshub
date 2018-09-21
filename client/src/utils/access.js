import _ from 'lodash';
import { configuration } from 'constants/routes';

export default {
  convertToPermission(url) {
    url = url.substring(5);
    
    const slash = url.indexOf('/');

    if (slash === -1) {
      return `${url}:read`;
    } else {
      const trailing = url.substring(slash + 1);
      const model = url.substring(0, slash);

      if (trailing === 'new') {
        return `${model}:create`;
      } else {
        return `${model}:read`;
      }
    }
  },
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
  getRole(url) {
    const route = _.find(configuration.routes, (n) => {
      return n.url === url;
    });

    if (route) {
      return route.role;
    }
    
    return '';
  },
}
