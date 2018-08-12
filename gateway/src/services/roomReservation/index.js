const data = require('../../utils/data');
const access = require('../../utils/access');
const proxy = require('../proxy/index');

module.exports = (router) => {
  router.delete('/api/room-reservation/:id', async (ctx, next) => {
    // CAN DELETE
  });

  router.patch('/api/room-reservation/:id', async (ctx, next) => {
      // CAN APPROVE
    // CAN DISABLE
    // CAN UPDATE ADMIN NOTES
  });

  router.post('/api/room-reservation', async (ctx, next) => {
    const path = ctx.request.path;
    const body = ctx.request.body;
    const headers = ctx.request.headers;
    const userId = ctx.state.user ? ctx.state.user.userId : '';

    // BATCHED CALLS
    const targetUser = JSON.parse(await data.get(`/api/user`, `?${qstring}`, {
      'content-type': 'application/json; charset=utf-8',
      'authorization': headers['authorization'],
    }));

    const can = await access.can(hook.params.authorization, options.service, hook.method);
    
    // GET ROOM MANAGERS

    
    // SEND ALL ROLES



    
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

      let targetUser;

      try {
        targetUser = JSON.parse(await data.get(`/api/user`, `?${qstring}`, {
          'content-type': 'application/json; charset=utf-8',
          'authorization': headers['authorization'],
        }));
      } catch (e) {
        throw { statusCode: 400, message: 'BARCODE_NOT_FOUND' };
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
    }
  });
};
