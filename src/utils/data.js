const querystring = require('querystring');
const _ = require('lodash');
const request = require('request-promise-native');

module.exports = {
  respond(ctx, response, next) {
    ctx.body = response;

    next();
  },
  handleError(ctx, e, next) {
    if (_.isError(e)) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, e.error);
      } else {
        ctx.throw(500);
      }  
    } else {
      ctx.throw(e.statusCode, {
        message: e.message,
      });
    }
    
    next();
  },
};
