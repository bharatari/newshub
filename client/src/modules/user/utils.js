import _ from 'lodash';
import jwt_decode from 'jwt-decode';

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
  validateNewUser(values) {
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

    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }

    return errors;
  },
  getId(jwt) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt_decode(jwt);

        resolve(decoded.userId);
      } catch (e) {
        reject();
      }
    });    
  }
};
