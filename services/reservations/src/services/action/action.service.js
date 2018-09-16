// Initializes the `action` service on path `/api/action`
const createService = require('feathers-sequelize');
const createModel = require('../../models/action.model');
const hooks = require('./action.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/action', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/action');

  service.hooks(hooks);
};
