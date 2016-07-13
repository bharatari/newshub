import _ from 'lodash';
import { localStorageAuthToken } from 'constants/keys';
import feathers from 'feathers-client';
import io from 'socket.io-client';

export default {
  configure() {
    let socket = io('http://localhost:3030');
    let app = feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(socket));

    this.app = app;
  },
  base: __DEV__ ? 'http://localhost:3030' : '',
  getCurrentBase() {
    let url = window.location.protocol + '//' + window.location.hostname;
     
    if (window.location.port) {
      url += ':' + window.location.port;
    }
     
    return url;
  },
  apiRoot: '/api',
  options: {
    headers: {},
  },

  /**
   * Dynamically constructs JSON API request.
   *
   * @param {string} dataType
   * @param {string} method
   * @param {string} id
   * @param {Object} body
   * @param {Object} settings
   * @return {Promise}
   */
  request(dataType, method, id, query, body, settings) {
    const { serialize, resolve } = this.processSettings(settings);
    const url = this.processUrl(dataType, id, query);
    const options = this.processOptions(body, method, serialize);

    return fetch(url, options)
      .then(this.checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return this.processResponse(data, resolve);
      });
  },

  /**
   * Dynamically constructs WebSockets request through
   * feathers-client and socket.io. Requires configure
   * function to be called before use.
   *
   * @param {string} dataType
   * @param {string} action
   * @param {Object} data
   * @param {string} id
   * @return {Promise}
   */
  on(dataType, action, cb) {
    if (this.app == null) {
      throw new Error('Must call configure before use.');
    }

    var service = this.app.service('api/' + dataType);
    service.on(action, cb);    
  },
  processUrl(dataType, id, query = '') {
    let url = this.base + this.apiRoot + '/' + dataType;

    if (id != null) {
      url += '/' + id;
    }
    
    if (query != null) {
      if (_.isString(query)) {
        url += query;
      } else {
        url += this.processQuery(query);
      }
    }
    
    return url;
  },
  processOptions(body, method, serialize) {
    let options = { 
      ...this.options
    };

    if (localStorage.getItem(localStorageAuthToken)) {
      options.headers['Authorization'] = 'Bearer ' + localStorage.getItem(localStorageAuthToken);
    }

    if (body) {
      if (serialize) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json; charset=utf-8';
      } else {
        options.body = body;
      }
    }

    if (method) {
      options.method = method;
    }

    return options;
  },
  processResponse(body, resolve) {
    if (body != null) {
      if (resolve) {
        if (body.data) {
          return body.data;
        }
      }
    }
   
    return body;
  },
  /**
   * Checks for error status.
   *
   * @param {Object} response
   * @return {Object}
   * @throws {Error}
   */
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },
  processQuery(data) {
    let ret = [];
    
    for (let d in data) {
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
      
    return '?' + ret.join("&");
  },
  getAuthToken() {
    return localStorage.getItem(localStorageAuthToken);
  },
  processSettings(settings) {
    if (settings) {
      if (settings.serialize == null) {
        settings.serialize = true;
      }

      if (settings.resolve == null) {
        settings.resolve = true;
      }

      return settings;
    } else {
      settings = {
        serialize: true,
        resolve: true,
      };

      return settings;
    }
  }
};
