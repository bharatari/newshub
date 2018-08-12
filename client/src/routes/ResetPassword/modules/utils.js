import _ from 'lodash';

export default {
  validateResetPassword(values) {
    let errors = {};

    if (!values.email) {
      errors.email = 'Required';
    }

    return errors;
  },
};
