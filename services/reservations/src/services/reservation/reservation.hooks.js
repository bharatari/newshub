
'use strict';

const addToOrganization = require('../../hooks/addToOrganization');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');
const includeUser = require('../../hooks/includeUser');
const access = require('../../hooks/access');
const hooks = require('feathers-hooks-common');
const associate = require('./hooks/associate');
const populate = require('./hooks/populate');
const process = require('./hooks/process');
const filter = require('./hooks/filter');
const status = require('./hooks/status');
const email = require('./hooks/email');
const validate = require('./hooks/validate');
const remove = require('./hooks/remove');
const restrict = require('./hooks/restrict');
const count = require('./hooks/count');
const specialApproval = require('./hooks/specialApproval');
const preventIncludeUpdates = require('./hooks/preventIncludeUpdates');

module.exports = {
  before: {
    all: [
      access({ service: 'reservation' }),
      protectOrganization({ model: 'reservation' }),
      restrictChangeOrganization({ model: 'reservation' }),
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
      validate(),
      restrict(),
      specialApproval(),
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
      associate(),
      email(),
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
