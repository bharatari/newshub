import _ from 'lodash';
import moment from 'moment';

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
  validateNewEvent(values) {
    let errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (values.startDate >= values.endDate) {
      errors.startDate = 'Start date cannot be after end date';
    }

    return errors;
  },
  isOpen(event) {
    if (event) {
      if (event.closed) {
        return false;
      }

      const now = moment.now();

      if (moment(event.startDate).isBefore(now) && moment(event.endDate).isAfter(now)) {
        return true;
      }
    }

    return false;
  }
};
