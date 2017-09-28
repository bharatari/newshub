const _ = require('lodash');

module.exports = function () {
  return function (hook) {
    if (_.isNumber(hook.data.userId)) {
      hook.data.userId = hook.data.userId.toString();
    }
    
    if (_.isNumber(hook.data.targetUserId)) {
      hook.data.targetUserId = hook.data.targetUserId.toString();
    }

    hook.data.organizationId = hook.params.user.currentOrganizationId;

    return hook;
  };
};
