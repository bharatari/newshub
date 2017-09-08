'use strict';

const organization = require('./organization');
const activity = require('./activity');
const building = require('./building');
const roomReservation = require('./roomReservation');
const room = require('./room');
const resetPassword = require('./resetPassword');
const meta = require('./meta');
const role = require('./role');
const image = require('./image');
const signupToken = require('./signupToken');
const notification = require('./notification');
const reservation = require('./reservation');
const device = require('./device');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;

  let sequelize;

  if (app.get('env') === 'development') {
    sequelize = new Sequelize(app.get('postgres'), {
      dialect: 'postgres',
      logging: false,
    });
  } else {
    sequelize = new Sequelize(app.get('postgres'), {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: true,
      },
    });
  }

  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(device);
  app.configure(reservation);
  app.configure(notification);
  app.configure(signupToken);
  app.configure(image);
  app.configure(role);
  app.configure(meta);
  app.configure(resetPassword);
  app.configure(room);
  app.configure(roomReservation);
  app.configure(building);
  app.configure(activity);
  app.configure(organization);

  const models = sequelize.models;

  Object.keys(models)
    .map(name => models[name])
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};
