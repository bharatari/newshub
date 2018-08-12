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
};
