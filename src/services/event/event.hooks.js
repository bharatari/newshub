const access = require('../../hooks/access');
const process = require('./hooks/process');

module.exports = {
  before: {
    all: [
      access({ service: 'event' }),
    ],
    find: [],
    get: [],
    create: [
      process(),
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
