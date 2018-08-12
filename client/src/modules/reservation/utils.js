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

    if (!values.devices || _.isEmpty(values.devices)) {
      errors.devices = 'Need to add at least one device to reservation';
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
    } else if (reservation.approved && reservation.checkedOut && !reservation.checkedIn) {
      return 'CHECKED_OUT';
    } else if (reservation.approved && reservation.checkedOut && reservation.checkedIn) {
      return 'CHECKED_IN';
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
    'CHECKED_OUT': 'Checked Out',
    'CHECKED_IN': 'Checked In',
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
    'CHECKED_OUT': '#2185D0',
    'CHECKED_IN': '#b84fc9',
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
    } else if (status === 'APPROVED') {
      return {
        checkedOut: true,
      };
    } else if (status === 'CHECKED_OUT') {
      return {
        checkedIn: true,
      };
    }

    return null;
  },
};
