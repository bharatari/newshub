const _ = require('lodash');
const data = require('../../../utils/data');

module.exports = function () {
  return async function (hook) {
    hook.data.organizationId = hook.params.user.currentOrganizationId;

    return hook;
  };
};
