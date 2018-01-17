const email = require('../../../utils/email');
const data = require('../../../utils/data');

module.exports = function (options) {
  return async function (hook) {
    const users = await data.getDeviceManagers(hook.params.authorization);

    try {
      await email.queueEmails(users, null, hook.params.user.fullName, 'CREATED_RESERVATION');

      return hook;
    } catch (e) {
      // Don't throw error just because email didn't send
      return hook;
    }
  };
};
