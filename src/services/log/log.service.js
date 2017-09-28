// Initializes the `log` service on path `/api/log`
const createService = require('feathers-sequelize');
const createModel = require('../../models/log.model');
const hooks = require('./log.hooks');
const filters = require('./log.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'log',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/log', function (req, res, next) {
    req.feathers.headers = req.headers;

    next();
  }, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/log');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
