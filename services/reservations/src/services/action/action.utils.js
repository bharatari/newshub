'use strict';

module.exports = {
  async storeAction(models, id, newObject, actionPerformed, user) {
    const action = await models.action.create({
      oldObject: await models.reservation.findOne({ where: { id }}),
      newObject,
      action: actionPerformed,
      user,
      reservationId: id,
    });
  },
};
