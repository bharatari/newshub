const access = require('../../hooks/access');
const process = require('./hooks/process');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');
const hooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      access({ service: 'event' }),
      protectOrganization({ model: 'event' }),
      restrictChangeOrganization({ model: 'event' }),
    ],
    find: [],
    get: [],
    create: [
      process(),
    ],
    update: [
      hooks.disallow(),
    ],
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
