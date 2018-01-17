const addToOrganization = require('../../hooks/addToOrganization');
const protectOrganization = require('../../hooks/protectOrganization');
const restrictChangeOrganization = require('../../hooks/restrictChangeOrganization');
const hooks = require('feathers-hooks-common');
const dehydrate = require('feathers-sequelize/hooks/dehydrate');
const access = require('../../hooks/access');
const quantity = require('./hooks/quantity');
const all = require('./hooks/all');
const count = require('./hooks/count');
const unique = require('./hooks/unique');

module.exports = {
  before: {
    all: [
      access({ service: 'device' }),
      protectOrganization({ model: 'device' }),
      restrictChangeOrganization({ model: 'device' }),
    ],
    find: [
      all(),
      quantity(),
    ],
    get: [],
    create: [
      unique(),
      addToOrganization(),
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      all(),
      count(),
      dehydrate(),
      quantity(),
    ],
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
