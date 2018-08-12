const data = require('../../utils/data');
const proxy = require('../proxy/index');

module.exports = (router) => {
  router.post('/api/reservation', async (ctx, next) => {
    // TODO: Properly integrate with reservations microservice
    const path = ctx.request.path;
    const body = ctx.request.body;
    const headers = ctx.request.headers;
    const userId = ctx.state.user ? ctx.state.user.userId : '';

    try {
      headers['newshub-user-id'] = userId;
    
      if (userId) {
        headers['newshub-organization-id'] = await data.getOrganizationId(userId, {
          'content-type': 'application/json; charset=utf-8',
          'authorization': headers['authorization'],
        });
      }

      const reservation = await data.post('/api/reservation', {
        userId,
      }, {
        'content-type': 'application/json; charset=utf-8',
        'authorization': headers['authorization'],
        'newshub-user-id': headers['newshub-user-id'],
        'newshub-organization-id': headers['newshub-organization-id'],
      });

      data.respond(ctx, reservation, next);
    } catch (e) {
      data.handleError(ctx, e, next);
    }
  });
};
