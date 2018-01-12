module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;

    if (hook.params.skip) {
      return hook;  
    }
    
    const object = await models[options.model].findOne({
      where: {
        id: hook.id,
      },
    });

    if (hook.method === 'patch' || hook.method === 'update') {
      if (hook.data.organizationId) {
        if (hook.data.organizationId !== object.organizationId) {
          throw new errors.BadRequest();
        }
      }
    }

    return hook;    
  };
};
