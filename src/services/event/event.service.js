// Initializes the `event` service on path `/api/event`
const createService = require('feathers-sequelize');
const createModel = require('../../models/event.model');
const hooks = require('./event.hooks');
const filters = require('./event.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'event',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/event', function (req, res, next) {
    req.feathers.headers = req.headers;

    next();
  }, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/event');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
