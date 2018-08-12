// Initializes the `building` service on path `/api/building`
const createService = require('feathers-sequelize');
const createModel = require('../../models/building.model');
const hooks = require('./building.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'building',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/building', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/building');

  service.hooks(hooks);
};
