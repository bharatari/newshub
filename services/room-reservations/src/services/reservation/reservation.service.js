// Initializes the `reservation` service on path `/api/reservation`
const createService = require('feathers-sequelize');
const createModel = require('../../models/reservation.model');
const hooks = require('./reservation.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'reservation',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/reservation', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('/api/reservation');

  service.hooks(hooks);
};
