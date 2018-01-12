const access = require('../../hooks/access');
const process = require('./hooks/process');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');

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
