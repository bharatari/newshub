import _ from 'lodash';
import array from 'utils/array';

export default {
  getRemainingDevices(devices, selectedDevices, specialApproval) {
    const remaining = _.cloneDeep(devices);

    if (remaining) {
      for (let property in remaining) {
        if (remaining.hasOwnProperty(property)) {
          const type = _.filter(selectedDevices, function (o) {
            return o.type === property;
          });

          remaining[property] = _.differenceWith(remaining[property], type, function (a, b) {
            return a.id === b.id;
          });
        }
      }
    }

    if (remaining) {
      for (let property in remaining) {
        if (remaining.hasOwnProperty(property)) {
          remaining[property].map((item) => {
            if (specialApproval) {
              if (item.specialApproval) {
                if (item.specialApproval !== specialApproval) {
                  item.disabled = true;

                  return item;
                }
              }

              return item;
            }
          });
        }
      }
    }

    return remaining;
  },
  groupDevices(devices) {
    return _.groupBy(devices, 'type');
  },
  getSpecialApproval(selectedDevices) {
    let result = false;

    selectedDevices.forEach((item) => {
      if (item.specialApproval) {
        result = item.specialApproval;
      }
    });

    return result;
  }
};
