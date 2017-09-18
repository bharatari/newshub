const data = require('../../utils/data');
const querystring = require('querystring');

module.exports = (router) => {
  router.post('/api/log', async (ctx, next) => {
    const body = ctx.request.body;

    const barcode = encodeURIComponent(body.barcode);

    try {
      const query = {
        barcode,
      };
      const qstring = querystring.stringify(query);

      const user = await data.get(`/api/user?${qstring}`);
      const currentUserId = ctx.state.user.id;
      const currentUser = await data.get(`/api/user/${currentUserId}`);
      
      const log = await data.post('/api/log', {
        userId: user.id,
        eventId: body.eventId,
        organizationId: currentUser.currentOrganizationId,
      });

      log.user = user;

      ctx.body = log;
    } catch (e) {
      ctx.throw(400, e);
    }
  });
};
