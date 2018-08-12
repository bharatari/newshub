import _ from 'lodash';

export default {
  validateManualLog(values) {
    let errors = {};

    if (!values.user) {
      errors.user = 'Required';
    }

    if (!values.type) {
      errors.type = 'Required';
    }

    if (!values.date) {
      errors.date = 'Required';
    }

    return errors;
  },
};
