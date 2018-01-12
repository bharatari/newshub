const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;
  const connectionString = app.get('postgres');

  let ssl;

  if (app.get('DATABASE_SSL') === 'true') {
    ssl = true;
  } else {
    ssl = false;
  }

  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true
    },
    dialectOptions: {
      ssl,
    },
  });

  const oldSetup = app.setup;

  app.set('sequelize', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
