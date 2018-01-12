module.exports = function () {
  return function (hook) {
    hook.data.organizationId = hook.params.user.currentOrganizationId;
    hook.data.userId = hook.params.user.id;
    
    return hook;
  };
};
