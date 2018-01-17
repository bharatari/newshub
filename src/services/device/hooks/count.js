module.exports = function (options) {
  return function (hook) {
    const models = hook.app.get('sequelize').models;

    return models.device.count({
      where: {
        organizationId: hook.params.user.currentOrganizationId,
      },
    }).then((count) => {
      hook.result.total = count;
      
      return hook;
    }).catch((e) => {
      throw e;
    });
  };
};

