// Initializes the `tag` service on path `/api/tag`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tag.model');
const hooks = require('./tag.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tag',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/tag', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/tag');

  service.hooks(hooks);
};
