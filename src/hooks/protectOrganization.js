module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;
    
    if (hook.params.skip) {
      return hook;
    }

    if (hook.params.provider) {
      if (hook.method === 'update' || hook.method === 'patch' || hook.method === 'get') {
        return models[options.model].findOne({
          where: {
            id: hook.id
          }
        }).then((object) => {
          if (object.organizationId !== hook.params.user.currentOrganizationId) {
            throw new errors.NotAuthenticated();
          }

          return hook;
        }).catch((e) => {
          throw e;
        });
      } else if (hook.method === 'find') {
        hook.params.query.organizationId = hook.params.user.currentOrganizationId;
      }

      return hook;
    }
  
  };
};
