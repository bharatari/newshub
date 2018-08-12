// Initializes the `file` service on path `/api/file`
const createService = require('feathers-sequelize');
const createModel = require('../../models/file.model');
const hooks = require('./file.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'file',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/file', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/file');

  service.hooks(hooks);
};
