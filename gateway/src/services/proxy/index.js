const data = require('../../utils/data');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  if (!ctx.body) {
    const path = ctx.request.path;
    const query = ctx.request.search;
    const method = ctx.request.method.toLowerCase();
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

      // Don't dynamically resolve method names
      // as function calls for security reasons
      if (method === 'get') {
        const response = await data.get(path, query, headers);

        data.respond(ctx, response, next);
      } else if (method === 'post') {
        const response = await data.post(path, body, headers, ctx.req);

        data.respond(ctx, response, next);
      } else if (method === 'put') {
        const response = await data.put(path, body, headers);

        data.respond(ctx, response, next);
      } else if (method === 'patch') {
        const response = await data.patch(path, body, headers);

        data.respond(ctx, response, next);
      } else if (method === 'delete') {
        const response = await data.delete(path, headers);

        data.respond(ctx, response, next);
      }
    } catch (e) {
      data.handleError(ctx, e, next);
    }
  } else {
    next();
  }
  
};
