'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const quantity = require('./quantity');
const populate = require('./populate');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [
    populate(),
    quantity(),
  ],
  get: [
    populate(),
  ],
  create: [
    globalHooks.checkRoles({ service: 'device' }),
  ],
  update: [],
  patch: [],
  remove: [],
};

exports.after = {
  all: [],
  find: [
    quantity(),
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
