import { createSelector } from 'reselect';
import utils from './utils';
import _ from 'lodash';

const getRooms = (state) => _.get(state, 'room.fetchRooms.rooms', null);

export const processRooms = createSelector(
  getRooms,
  (rooms, selectedDevices) => {
    return utils.processRooms(rooms);
  }
);
