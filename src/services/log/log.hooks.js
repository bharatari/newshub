const event = require('./hooks/event');
const type = require('./hooks/type');
const process = require('./hooks/process');
const access = require('../../hooks/access');

module.exports = {
  before: {
    all: [
      access({ service: 'log' }),
    ],
    find: [],
    get: [],
    create: [
      event(),
      type(),
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
