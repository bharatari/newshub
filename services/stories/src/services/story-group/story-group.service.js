// Initializes the ` storyGroup` service on path `/api/story-group`
const createService = require('feathers-sequelize');
const createModel = require('../../models/story-group.model');
const hooks = require('./story-group.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'story-group',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/story-group', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/story-group');

  service.hooks(hooks);
};
