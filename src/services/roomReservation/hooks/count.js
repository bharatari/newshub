'use strict';

module.exports = function (options) {
  return function (hook) {
    const models = hook.app.get('sequelize').models;

    return models.roomReservation.count()
      .then(function (count) {
        hook.result.total = count;
        
        return hook;
      }); 
  };
};

