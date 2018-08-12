module.exports = function (options) {
  return async function (hook) {
    if (hook.method === 'create' && hook.type === 'before') {
      hook.data.organizationId = hook.params.user.currentOrganizationId;
      hook.data.userId = hook.params.user.id;
    }

    return hook;    
  }
}
