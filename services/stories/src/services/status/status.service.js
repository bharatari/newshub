// Initializes the `status` service on path `/api/status`
const createService = require('feathers-sequelize');
const createModel = require('../../models/status.model');
const hooks = require('./status.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'status',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/status', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/status');

  service.hooks(hooks);
};
