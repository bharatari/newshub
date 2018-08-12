import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';
import _ from 'lodash';

export const requestRoomReservations = createAction('REQUEST_ROOM_RESERVATIONS');
export const receiveRoomReservations = createAction('RECEIVE_ROOM_RESERVATIONS');

export const requestRoomReservation = createAction('REQUEST_ROOM_RESERVATION');
export const receiveRoomReservation = createAction('RECEIVE_ROOM_RESERVATION');

export const requestCreateRoomReservation = createAction('REQUEST_CREATE_ROOM_RESERVATION');
export const receiveCreateRoomReservation = createAction('RECEIVE_CREATE_ROOM_RESERVATION');

export const requestUpdateRoomReservation = createAction('REQUEST_UPDATE_ROOM_RESERVATION');
export const receiveUpdateRoomReservation = createAction('RECEIVE_UPDATE_ROOM_RESERVATION');

export const requestDeleteRoomReservation = createAction('REQUEST_DELETE_ROOM_RESERVATION');
export const receiveDeleteRoomReservation = createAction('RECEIVE_DELETE_ROOM_RESERVATION');

export const resetCreateRoomReservation = createAction('RESET_CREATE_ROOM_RESERVATION');
export const resetFetchRoomReservations = createAction('RESET_FETCH_ROOM_RESERVATIONS');
export const resetUpdateRoomReservation = createAction('RESET_UPDATE_ROOM_RESERVATION');

export function fetchRoomReservation(id) {
  return function (dispatch) {
    dispatch(requestRoomReservation());

    data.request('room-reservation', 'get', id)
      .then(function (response) {
        dispatch(receiveRoomReservation(response))
      }).catch(function (e) {
        dispatch(receiveRoomReservation(e));
      });
  };
}

export function fetchRoomReservations(options) {
  return function (dispatch, getState) {
    dispatch(requestRoomReservations());

    let startDate, endDate, limit, page, disabled, sortField, sortType, roomId;

    if (!_.isNil(options)) {
      ({ startDate, endDate, limit, page, disabled, sortField, sortType, roomId } = options);
    }
    
    if (_.isNil(limit)) {
      limit = 10;
    }

    if (_.isNil(page)) {
      page = 1;
    }

    const skip = data.pageToSkip(page, limit);

    if (_.isNil(sortField)) {
      sortField = 'createdAt';
    }

    if (_.isNil(sortType)) {
      sortType = 'DESC';
    }

    const roomIdParam = _.isNil(roomId) ? '' : `&roomId=${roomId}`;
    const sort = data.constructSort(sortField, sortType);

    let query = `?${sort}&$limit=${limit}&$skip=${skip}${roomIdParam}`;

    if (startDate && endDate) {
      query += '&startDate=' + encodeURIComponent(startDate);
      query += '&endDate=' + encodeURIComponent(endDate);
    }

    if (!_.isNil(disabled)) {
      query += '&disabled=' + encodeURIComponent(disabled);
    }

    data.request('room-reservation', 'get', null, query, null, {
      resolve: false,
    }).then(function (response) {
      dispatch(receiveRoomReservations(response));
    }).catch(function (e) {
      dispatch(receiveRoomReservations(e));
    });
  };
}

export function updateRoomReservation(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateRoomReservation());

    data.request('room-reservation', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateRoomReservation(response))
      }).catch(function (e) {
        dispatch(receiveUpdateRoomReservation(e));
      });
  };
}

export function createRoomReservation(body) {
  return function (dispatch) {
    dispatch(requestCreateRoomReservation());

    data.request('room-reservation', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateRoomReservation(response))
      }).catch(function (e) {
        dispatch(receiveCreateRoomReservation(e));
      });
  };
}
