// Initializes the `assignment` service on path `/api/assignment`
const createService = require('feathers-sequelize');
const createModel = require('../../models/assignment.model');
const hooks = require('./assignment.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'assignment',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/assignment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/assignment');

  service.hooks(hooks);
};
