'use strict';

const errors = require('@feathersjs/errors');
const email = require('../../utils/email');
const _ = require('lodash');
const access = require('../../utils/access');
const async = require('async');
const data = require('../../utils/data');
const action = require('../action/action.utils');

module.exports = {
  async checkSpecialApproval(models, id) {
    return models.reservation.findOne({
      where: {
        id,
      },
      include: [{
        model: models.device,
      }],
    }).then((reservation) => {
      for (let i = 0; i < reservation.devices.length; i++) {
        if (reservation.devices[i].specialApproval) {
          return reservation.devices[i].specialApproval;
        }
      }

      return false;
    }).catch((err) => {
      throw new errors.GeneralError();
    });
  },

  /**
   * Handles reservation approval.
   * 
   * @param {Object} hook - Feathers request hook
   * @param models
   * @param redis
   * @param {string} userId
   * @param {Object} reservation - Old record from database
   * @param {Object} data - New data from request
   */
  async approve(hook, models, redis, userId, reservation, data) {
    const specialApproval = await this.checkSpecialApproval(models, reservation.id);

    if (specialApproval) {
      let canApproveSpecialApproval;

      // TODO: Pass full expanded roles from gateway
      if (access.isPermission(specialApproval)) {
        canApproveSpecialApproval = await access.has(hook.params.authorization, specialApproval);
      } else {
        canApproveSpecialApproval = await access.is(hook.params.authorization, specialApproval);
      }
      
      if (canApproveSpecialApproval) {
        hook.data.approvedBy = hook.params.user;

        try {
          await email.queueEmails([reservation.user], null, 'approved', 'USER_RESERVATION_RESPONSE');

          await action.storeAction(models, hook.id, hook.data, 'approved', hook.params.user);

          return hook;
        } catch (e) {
          // Don't throw error just because email didn't send
          return hook;
        }
      } else {
        throw new errors.Forbidden('MASTER_SPECIAL_REQUEST');
      }
    } else {
      // TODO: Pass full expanded roles from gateway
      const canApprove = await access.can(hook.params.authorization, 'reservation', 'update', 'approved', hook.id);

      if (canApprove) {
        hook.data.approvedBy = hook.params.user;

        try {
          await email.queueEmails([reservation.user], null, 'approved', 'USER_RESERVATION_RESPONSE');

          await action.storeAction(models, hook.id, hook.data, 'approved', hook.params.user);

          return hook;
        } catch (e) {
          // Don't throw error just because email didn't send
          return hook;
        }
      } else {
        throw new errors.Forbidden('Must have permission to update reservation status.');
      }
    }
  },
  async checkOut(hook, models, redis, userId, reservation, data) {
    // TODO: Pass full expanded roles from gateway
    const canCheckOut = await access.can(hook.params.authorization, 'reservation', 'update', 'checkedOut', hook.id);

    if (canCheckOut) {
      hook.data.checkedOutBy = hook.params.user;

      try {
        await email.queueEmails([reservation.user], null, 'checked out', 'USER_RESERVATION_RESPONSE');

        await action.storeAction(models, hook.id, hook.data, 'checkedOut', hook.params.user);

        return hook;
      } catch (e) {
        // Don't throw error just because email didn't send
        return hook;
      }
    } else {
      throw new errors.Forbidden('Must have permission to update reservation status.');
    }
  },
  async checkIn(hook, models, redis, userId, reservation, data) {
    // TODO: Pass full expanded roles from gateway
    const canCheckIn = await access.can(hook.params.authorization, 'reservation', 'update', 'checkedIn', hook.id);

    if (canCheckIn) {
      hook.data.checkedInBy = hook.params.user;

      try {
        await email.queueEmails([reservation.user], null, 'checked in', 'USER_RESERVATION_RESPONSE');

        await action.storeAction(models, hook.id, hook.data, 'checkedIn', hook.params.user);

        return hook;
      } catch (e) {
        // Don't throw error just because email didn't send
        return hook;
      }
    } else {
      throw new errors.Forbidden('Must have permission to update reservation status.');
    }
  },
  async disable(hook, models, redis, userId, reservation, data) {
    // TODO: Pass full expanded roles from gateway
    const canDisable = await access.can(hook.params.authorization, 'reservation', 'update', 'disabled', hook.id);

    if (canDisable) {
      hook.data.disabledBy = hook.params.user;

      try {
        await email.queueEmails([reservation.user], null, 'rejected', 'USER_RESERVATION_RESPONSE');

        await action.storeAction(models, hook.id, hook.data, 'disabled', hook.params.user);

        return hook;
      } catch (e) {
        // Don't throw error just because email didn't send
        return hook;
      }
    } else {
      throw new errors.Forbidden('Must have permission to update reservation status.');
    }
  },
  async adminNotes(hook, models, redis, userId, reservation, data) {
    // TODO: Pass full expanded roles from gateway
    const canUpdateAdminNotes = await access.can(hook.params.authorization, 'reservation', 'update', 'adminNotes', hook.id);

    if (canUpdateAdminNotes) {
      try {
        await email.queueEmails([reservation.user], null, adminNotes, 'USER_RESERVATION_ADMIN_NOTES');

        return hook;
      } catch (e) {
        // Don't throw error just because email didn't send
        return hook;
      }
    } else {
      throw new errors.Forbidden('Must have permission to update reservation admin notes.');
    }
  },
  overlaps(startDate, endDate) {
    return {
      $or: [{
        // Contains
        startDate: {
          $gte: new Date(startDate),
        },
        endDate: {
          $lte: new Date(endDate),
        },
      }, {
        // Overlaps (Greater)
        startDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        endDate: {
          $gte: new Date(endDate),
        },
      }, {
        // Overlaps (Less)
        startDate: {
          $lte: new Date(startDate),
        },
        endDate: {
          $lte: new Date(endDate),
          $gte: new Date(startDate),
        },
      }, {
        // Contains (Inverse)
        startDate: {
          $lte: new Date(startDate),
        },
        endDate: {
          $gte: new Date(endDate),
        },
      }],
    };
  },
};
