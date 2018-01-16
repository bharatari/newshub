const event = require('./hooks/event');
const type = require('./hooks/type');
const process = require('./hooks/process');
const access = require('../../hooks/access');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');

module.exports = {
  before: {
    all: [
      access({ service: 'log' }),
      protectOrganization({ model: 'log' }),
      restrictChangeOrganization({ model: 'log' }),
    ],
    find: [],
    get: [],
    create: [
      event(),
      process(),
      type(),
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
