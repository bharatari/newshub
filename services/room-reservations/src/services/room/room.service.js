// Initializes the `room` service on path `/api/room`
const createService = require('feathers-sequelize');
const createModel = require('../../models/room.model');
const hooks = require('./room.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'room',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/room', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/room');

  service.hooks(hooks);
};
