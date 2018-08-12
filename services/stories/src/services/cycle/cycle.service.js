// Initializes the `cycle` service on path `/api/cycle`
const createService = require('feathers-sequelize');
const createModel = require('../../models/cycle.model');
const hooks = require('./cycle.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'cycle',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/cycle', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/cycle');

  service.hooks(hooks);
};
