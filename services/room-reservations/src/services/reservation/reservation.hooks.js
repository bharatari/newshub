const addToOrganization = require('../../hooks/addToOrganization');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');
const includeUser = require('../../hooks/includeUser');
const access = require('../../hooks/access');
const hooks = require('feathers-hooks-common');
const preventIncludeUpdates = require('./hooks/preventIncludeUpdates');
const populate = require('./hooks/populate');
const process = require('./hooks/process');
const filter = require('./hooks/filter');
const status = require('./hooks/status');
const email = require('./hooks/email');
const validate = require('./hooks/validate');
const remove = require('./hooks/remove');
const restrict = require('./hooks/restrict');
const count = require('./hooks/count');
const approve = require('./hooks/approve');
const available = require('./hooks/available');
const manager = require('./hooks/manager');

module.exports = {
  before: {
    all: [
      access({ service: 'roomReservation' }),
      protectOrganization({ model: 'roomReservation' }),
      restrictChangeOrganization({ model: 'roomReservation' }),
    ],
    find: [
      validate(),
      filter(),
      populate(),
    ],
    get: [
      populate(),
    ],
    create: [
      process(),
      available(),
      validate(),
      restrict(),
      approve(),
      addToOrganization(),
      includeUser(),
    ],
    update: [
      hooks.disallow(),
    ],
    patch: [
      preventIncludeUpdates(),
      status(),
    ],
    remove: [
      remove(),
    ]
  },

  after: {
    all: [],
    find: [
      count(),
    ],
    get: [],
    create: [
      email(),
      manager(),
    ],
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
