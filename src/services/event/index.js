const data = require('../../utils/data');
const proxy = require('../proxy/index');

module.exports = (router) => {
  router.get('/api/event/:id', async (ctx, next) => {
    const path = ctx.request.path;
    const query = ctx.request.search;
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

      const response = JSON.parse(await data.get(path, query, headers));
      const user = JSON.parse(await data.get(`/api/user/${response.userId}`, '', headers));

      response.user = user;

      data.respond(ctx, response, next);
    } catch (e) {
      data.handleError(ctx, e, next);

      next();
    }
  });
};
