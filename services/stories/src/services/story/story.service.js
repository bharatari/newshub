// Initializes the `story` service on path `/api/story`
const createService = require('feathers-sequelize');
const createModel = require('../../models/story.model');
const hooks = require('./story.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'story',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/story', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/story');

  service.hooks(hooks);
};
