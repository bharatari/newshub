'use strict';

const user = require('../../user/utils');
const errors = require('feathers-errors');
const moment = require('moment');

module.exports = function (options) {
  return function (hook) {

    if (hook.data.signupToken) {
      return hook.app.get('sequelize').models.signupToken.findOne({
        where: {
          token: hook.data.signupToken,
        },
      }).then(function (response) {
        if (response.dataValues) {
          if (response.dataValues.hasBeenUsed) {
            throw new errors.BadRequest('SIGNUP_TOKEN_USED');
          } else if (new Date(response.dataValues.expires) < new Date()) {
            throw new errors.BadRequest('SIGNUP_TOKEN_EXPIRED');
          } else {
            return response.update({
              hasBeenUsed: true,
            }).then(function (response) {
              return hook;
            }).catch(function (err) {
              throw new errors.GeneralError('Unknown signup token error');
            });
          }
        } else {
          throw new errors.BadRequest('SIGNUP_TOKEN_INVALID');
        }
      }).catch(function (err) {
        throw err;
      });
    } else {
      throw new errors.BadRequest('SIGNUP_TOKEN_INVALID');
    }
  };
};
