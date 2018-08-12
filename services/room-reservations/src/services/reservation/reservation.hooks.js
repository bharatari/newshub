
const addToOrganization = require('../../hooks/addToOrganization');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');
const includeUser = require('../../hooks/includeUser');
const hooks = require('feathers-hooks-common');
const populate = require('./populate');
const process = require('./process');
const filter = require('./filter');
const status = require('./status');
const email = require('./email');
const validate = require('./validate');
const remove = require('./remove');
const restrict = require('./restrict');
const count = require('./count');
const approve = require('./approve');
const available = require('./available');
const manager = require('./manager');

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
