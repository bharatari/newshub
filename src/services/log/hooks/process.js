const _ = require('lodash');
const data = require('../../../utils/data');

module.exports = function () {
  return async function (hook) {
    hook.data.targetUser = await data.getUser(hook.params.authorization, hook.data.targetUserId);
    hook.data.organizationId = hook.params.user.currentOrganizationId;

    return hook;
  };
};
