const data = require('../../utils/data');

module.exports = async (ctx, next) => {
  const path = ctx.request.path;
  const query = ctx.request.search;
  const method = ctx.request.method.toLowerCase();
  const body = ctx.request.body;
  const headers = ctx.request.headers;

  // Don't dynamically resolve method names
  // as function calls for security reasons
  try {
    if (method === 'get') {
      const response = await data.get(path, query, headers);

      data.respond(ctx, response, next);
    } else if (method === 'post') {
      const response = await data.post(path, ctx, headers);

      data.respond(ctx, response, next);
    } else if (method === 'put') {
      const response = await data.put(path, body, headers);

      data.respond(ctx, response, next);
    } else if (method === 'delete') {
      const response = await data.delete(path, headers);

      data.respond(ctx, response, next);
    }
  } catch (e) {
    data.handleError(ctx, e, next);

    next();
  }
};
