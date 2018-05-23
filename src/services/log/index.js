const data = require('../../utils/data');
const querystring = require('querystring');

module.exports = (router) => {
  router.post('/api/log', async (ctx, next) => {
    const path = ctx.request.path;
    const body = ctx.request.body;
    const headers = ctx.request.headers;
    const userId = ctx.state.user ? ctx.state.user.userId : '';
    const barcode = body.barcode;
    const date = body.date;
    const type = body.type;

    try {
      headers['newshub-user-id'] = userId;
    
      if (userId) {
        try {
          headers['newshub-organization-id'] = await data.getOrganizationId(userId, {
            'content-type': 'application/json; charset=utf-8',
            'authorization': headers['authorization'],
          });
        } catch (e) {
          throw { statusCode: 401, message: 'NOT_AUTHENTICATED' };
        }
      }

      const query = {
        barcode,
      };

      const qstring = querystring.stringify(query);

      let targetUser;

      try {
        targetUser = JSON.parse(await data.get(`/api/user`, `?${qstring}`, {
          'content-type': 'application/json; charset=utf-8',
          'authorization': headers['authorization'],
        }));
      } catch (e) {
        if (e.statusCode === 401) {
          throw { statusCode: 401, message: 'NOT_AUTHENTICATED' };
        } else {
          throw { statusCode: 400, message: 'BARCODE_NOT_FOUND' };
        }
      }

      let targetUserId;

      if (targetUser) {
        if (targetUser[0]) {
          targetUserId = targetUser[0].id;
        } else {
          throw { statusCode: 400, message: 'BARCODE_NOT_FOUND' };
        }
      } else {
        throw { statusCode: 400, message: 'BARCODE_NOT_FOUND' };
      }

      const log = await data.post('/api/log', {
        userId,
        targetUserId,
        targetUser: targetUser[0],
        eventId: body.eventId,
        date,
        type,
      }, {
        'content-type': 'application/json; charset=utf-8',
        'authorization': headers['authorization'],
        'newshub-user-id': headers['newshub-user-id'],
        'newshub-organization-id': headers['newshub-organization-id'],
      });

      data.respond(ctx, log, next);
    } catch (e) {
      data.handleError(ctx, e, next);
    }
  });
};
