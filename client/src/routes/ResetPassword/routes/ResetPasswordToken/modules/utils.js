import _ from 'lodash';

export default {
  validateResetPassword(values) {
    let errors = {};

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
    }

    return errors;
  },
};
