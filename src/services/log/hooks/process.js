const _ = require('lodash');

module.exports = function () {
  return function (hook) {
    hook.data.userId = hook.data.userId;
    hook.data.targetUserId = hook.data.targetUserId;
    hook.data.organizationId = hook.params.user.currentOrganizationId;

    return hook;
  };
};
