// Initializes the `device` service on path `/api/device`
const createService = require('feathers-sequelize');
const createModel = require('../../models/device.model');
const hooks = require('./device.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'device',
    Model,
    paginate,
    raw: false,
  };

  // Initialize our service with any options it requires
  app.use('/api/device', function (req, res, next) {
    req.feathers.headers = req.headers;

    next();
  }, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/device');

  service.hooks(hooks);
};
