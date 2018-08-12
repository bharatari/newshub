import _ from 'lodash';

export default {
  processResponse(data) {
    if (data) {
      return {
        data,
        total: data.length,
      }
    } else {
      return {
        data,
        total: null,
      }
    }
  },
  validateNewReservation(values) {
    let errors = {};

    if (!values.startDate) {
      errors.startDate = 'Required';
    }

    if (!values.endDate) {
      errors.endDate = 'Required';
    }

    if (values.startDate >= values.endDate) {
      errors.startDate = 'Start date cannot be after end date';
    }

    if (!values.purpose) {
      errors.purpose = 'Required';
    }

    if (_.isNil(values.roomId)) {
      errors.roomId = 'Must select a room for this reservation';
    }

    return errors;
  },
  computeReservationStatus(reservation) {
    if (reservation.disabled) {
      if (reservation.approved) {
        return 'DISABLED';
      } else {
        return 'REJECTED';
      }
    } else if (!reservation.approved) {
      return 'NEEDS_APPROVAL';
    } else if (reservation.approved && !reservation.checkedOut && !reservation.checkedIn) {
      return 'APPROVED';
    } else {
      return 'UNKNOWN';
    }
  },
  getReservationStatus(reservation) {
    return this.reservationStatus[this.computeReservationStatus(reservation)];
  },
  reservationStatus: {
    'REJECTED': 'Rejected',
    'DISABLED': 'Disabled',
    'NEEDS_APPROVAL': 'Needs Approval',
    'APPROVED': 'Approved',
    'UNKNOWN': 'Unknown',
  },
  getReservationColor(reservation) {
    return this.reservationColors[this.computeReservationStatus(reservation)];
  },
  reservationColors: {
    'REJECTED': '#ff6a6c',
    'DISABLED': '#ff6a6c',
    'NEEDS_APPROVAL': '#f5cc00',
    'APPROVED': '#5EE087',
    'UNKNOWN': '#838383',
  },
  constructAdminAction(status, reject) {
    if (status === 'NEEDS_APPROVAL') {
      if (reject) {
        return {
          disabled: true,
        };
      } else {
        return {
          approved: true,
        };
      }
    }

    return null;
  },
};
