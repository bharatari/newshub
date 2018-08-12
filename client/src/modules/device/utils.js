import _ from 'lodash';

export default {
  validateNewDevice(values) {
    let errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.label) {
      errors.label = 'Required';
    }

    if (!values.quantity) {
      errors.quantity = 'Required. This is typically set to 1.';
    }

    if (!values.type) {
      errors.type = 'Required';
    }

    return errors;
  },
  available(device) {
    if (device) {
      if (device.availableQuantity < 1) {
        return false;
      } else {
        if (device.disabled) {
          return false;
        }
        
        return true;
      }
    }
    
    return false;
  },
};
