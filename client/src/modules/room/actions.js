import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';

export const requestRooms = createAction('REQUEST_ROOMS');
export const receiveRooms = createAction('RECEIVE_ROOMS');

export const requestRoom = createAction('REQUEST_ROOM');
export const receiveRoom = createAction('RECEIVE_ROOM');

export const requestCreateRoom = createAction('REQUEST_CREATE_ROOM');
export const receiveCreateRoom = createAction('RECEIVE_CREATE_ROOM');

export const requestUpdateRoom = createAction('REQUEST_UPDATE_ROOM');
export const receiveUpdateRoom = createAction('RECEIVE_UPDATE_ROOM');

export const requestDeleteRoom = createAction('REQUEST_DELETE_ROOM');
export const receiveDeleteRoom = createAction('RECEIVE_DELETE_ROOM');

export const resetCreateRoom = createAction('RESET_CREATE_ROOM');
export const resetUpdateRoom = createAction('RESET_UPDATE_ROOM');

export function fetchRooms(startDate, endDate, disabled) {
  return function (dispatch) {
    dispatch(requestRooms());
    
    let query = {
      '$sort[createdAt]': 1,
    };

    if (startDate && endDate) {
      query = {
        ...query,
        startDate,
        endDate,
      };
    }

    if (disabled != null) {
      query = {
        ...query,
        disabled,
      };
    }

    data.request('room', 'get', null, query)
      .then(function (response) {
        dispatch(receiveRooms(utils.processResponse(response)));
      }).catch(function (e) {
        dispatch(receiveRooms(e));
      });
  };
}

export function fetchRoom(id) {
  return function (dispatch) {
    dispatch(requestRoom());

    data.request('room', 'get', id)
      .then(function (response) {
        dispatch(receiveRoom(response));
      }).catch(function (e) {
        dispatch(receiveRoom(e));
      });
  };
}

export function createRoom(body) {
  return function (dispatch) {
    dispatch(requestCreateRoom());

    data.request('room', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateRoom(response));
      }).catch(function (e) {
        dispatch(receiveCreateRoom(e));
      });
  };
}

export function updateRoom(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateRoom());

    data.request('room', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateRoom(response));
      }).catch(function (e) {
        dispatch(receiveUpdateRoom(e));
      });
  };
}
