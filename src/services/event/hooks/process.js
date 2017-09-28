module.exports = function () {
  return function (hook) {
    hook.data.organizationId = hook.params.user.currentOrganizationId;
  
    return hook;
  };
};
