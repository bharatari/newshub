import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';
import _ from 'lodash';

export const requestReservations = createAction('REQUEST_RESERVATIONS');
export const receiveReservations = createAction('RECEIVE_RESERVATIONS');

export const requestReservation = createAction('REQUEST_RESERVATION');
export const receiveReservation = createAction('RECEIVE_RESERVATION');

export const requestCreateReservation = createAction('REQUEST_CREATE_RESERVATION');
export const receiveCreateReservation = createAction('RECEIVE_CREATE_RESERVATION');

export const requestUpdateReservation = createAction('REQUEST_UPDATE_RESERVATION');
export const receiveUpdateReservation = createAction('RECEIVE_UPDATE_RESERVATION');

export const requestDeleteReservation = createAction('REQUEST_DELETE_RESERVATION');
export const receiveDeleteReservation = createAction('RECEIVE_DELETE_RESERVATION');

export const resetCreateReservation = createAction('RESET_CREATE_RESERVATION');
export const resetFetchReservations = createAction('RESET_FETCH_RESERVATIONS');
export const resetUpdateReservation = createAction('RESET_UPDATE_RESERVATION');

export function fetchReservation(id) {
  return function (dispatch) {
    dispatch(requestReservation());

    data.request('reservation', 'get', id)
      .then(function (response) {
        dispatch(receiveReservation(response))
      }).catch(function (e) {
        dispatch(receiveReservation(e));
      });
  };
}

export function fetchReservations(options) {
  return function (dispatch, getState) {
    const { reservation: { fetchReservations } } = getState();
    let startDate, endDate, limit, page, disabled, sortField, sortType;

    if (!_.isNil(options)) {
      ({ startDate, endDate, limit, page, disabled, sortField, sortType } = options);
    }
    
    if (_.isNil(limit)) {
      if (!_.isNil(fetchReservations.limit)) {
        limit = fetchReservations.limit;
      } else {
        limit = 10;
      }
    }

    if (_.isNil(page)) {
      if (!_.isNil(fetchReservations.currentPage)) {
        page = fetchReservations.currentPage;
      } else {
        page = 1;
      }
    }

    const skip = data.pageToSkip(page, limit);

    if (_.isNil(sortField)) {
      if (!_.isNil(fetchReservations.sortField)) {
        sortField = fetchReservations.sortField;
      } else {
        sortField = 'createdAt';
      }
    }

    if (_.isNil(sortType)) {
      if (!_.isNil(fetchReservations.sortType)) {
        sortType = fetchReservations.sortType;
      } else {
        sortType = 'DESC';
      }
    }

    const sort = data.constructSort(sortField, sortType);

    let query = `?${sort}&$limit=${limit}&$skip=${skip}`;

    if (startDate && endDate) {
      query += '&startDate=' + encodeURIComponent(startDate);
      query += '&endDate=' + encodeURIComponent(endDate);
    }

    if (!_.isNil(disabled)) {
      query += '&disabled=' + encodeURIComponent(disabled);
    }

    dispatch(requestReservations({
      sortField,
      sortType,
      limit,
    }));

    console.log(query);

    data.request('reservation', 'get', null, query, null, {
      resolve: false,
    }).then(function (response) {
      dispatch(receiveReservations(response));
    }).catch(function (e) {
      dispatch(receiveReservations(e));
    });
  };
}

export function updateReservation(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateReservation());

    data.request('reservation', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateReservation(response))
      }).catch(function (e) {
        dispatch(receiveUpdateReservation(e));
      });
  };
}

export function createReservation(body) {
  return function (dispatch) {
    dispatch(requestCreateReservation());

    data.request('reservation', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateReservation(response))
      }).catch(function (e) {
        dispatch(receiveCreateReservation(e));
      });
  };
}
