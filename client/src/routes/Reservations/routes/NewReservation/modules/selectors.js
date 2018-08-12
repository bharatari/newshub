import { createSelector } from 'reselect';
import wizard from './utils';
import _ from 'lodash';

const getDevices = (state) => _.get(state, 'device.fetchDevices.devices', null);
const getSelectedDevices = (state) => _.get(state, 'newReservation.form.selectedDevices', null);

export const groupDevices = createSelector(
  getDevices,
  (devices) => {
    return wizard.groupDevices(devices);
  }
);

export const getSpecialApproval = createSelector(
  getSelectedDevices,
  (selectedDevices) => {
    return wizard.getSpecialApproval(selectedDevices);
  }
)

export const getRemainingDevices = createSelector(
  groupDevices,
  getSelectedDevices,
  getSpecialApproval,
  (devices, selectedDevices, specialApproval) => {
    return wizard.getRemainingDevices(devices, selectedDevices, specialApproval);
  }
);

