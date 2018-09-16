const data = require('../../../utils/data');
const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return async function (hook) {
    if (hook.type === 'before') {
      if (hook.data.targetUserId) {
        const canCreateInstant = await access.has(hook.params.authorization, 'reservation', 'instant');
        const canApprove = await access.has(hook.params.authorization, 'reservation', 'update', 'approved');
  
        if (canCreateInstant && canApprove) {
          const targetUserId = hook.data.targetUserId;

          delete hook.data.targetUserId;

          // We also need to grab the user object
          hook.data.userId = userId;

          hook.params.instant = true;
        } else {
          throw new errors.Forbidden('Only admins can create instant reservations.');
        }
      }
    } else {
      if (hook.params.instant) {
        hook = await utils.approve(hook, models, redis, hook.params.user.id, reservation, hook.data);
        hook = await utils.checkOut(hook, models, redis, hook.params.user.id, reservation, hook.data);


      }
    }
    

    return hook;
    
    // set reservation's user appropriately

    // in after hook, approve the reservation and chdeck out
  };
};
