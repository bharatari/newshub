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
  validateNewRoom(values) {
    let errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.label) {
      errors.label = 'Required';
    }

    return errors;
  },
  processRooms(rooms) {
    const array = [];

    if (rooms) {
      for (let i = 0; i < rooms.length; i++) {
        array[i] = {
          value: 1,
          label: rooms[i].label,
        };
      }
    }

    return array;
  }
};
