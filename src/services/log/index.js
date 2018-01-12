const data = require('../../utils/data');
const querystring = require('querystring');

module.exports = (router) => {
  router.post('/api/log', async (ctx, next) => {
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

      const query = {
        barcode,
      };

      const qstring = querystring.stringify(query);

      const targetUser = JSON.parse(await data.get(`/api/user`, `?${qstring}`, {
        'content-type': 'application/json; charset=utf-8',
        'authorization': headers['authorization'],
      }));

      const targetUserId = targetUser[0].id;

      const log = await data.post('/api/log', {
        userId,
        targetUserId,
        eventId: body.eventId,
      }, {
        'content-type': 'application/json; charset=utf-8',
        'authorization': headers['authorization'],
        'newshub-user-id': headers['newshub-user-id'],
        'newshub-organization-id': headers['newshub-organization-id'],
      });

      log.targetUser = targetUser[0];

      data.respond(ctx, log, next);
    } catch (e) {
      data.handleError(ctx, e, next);

      next();
    }
  });
};
