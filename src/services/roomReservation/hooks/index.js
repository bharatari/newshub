'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
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

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
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
    approve(),
  ],
  update: [
    hooks.disable(),
  ],
  patch: [
    status(),
  ],
  remove: [
    remove(),
  ],
};

exports.after = {
  all: [],
  find: [
    count(),
  ],
  get: [],
  create: [
    email(),
  ],
  update: [],
  patch: [],
  remove: [],
};
