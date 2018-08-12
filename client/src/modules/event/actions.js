import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';
import _ from 'lodash';

export const requestEvents = createAction('REQUEST_EVENTS');
export const receiveEvents = createAction('RECEIVE_EVENTS');

export const requestEvent = createAction('REQUEST_EVENT');
export const receiveEvent = createAction('RECEIVE_EVENT');

export const requestCreateEvent = createAction('REQUEST_CREATE_EVENT');
export const receiveCreateEvent = createAction('RECEIVE_CREATE_EVENT');

export const requestUpdateEvent = createAction('REQUEST_UPDATE_EVENT');
export const receiveUpdateEvent = createAction('RECEIVE_UPDATE_EVENT');

export const requestDeleteEvent = createAction('REQUEST_DELETE_EVENT');
export const receiveDeleteEvent = createAction('RECEIVE_DELETE_EVENT');

export const resetCreateEvent = createAction('RESET_CREATE_EVENT');
export const resetFetchEvent = createAction('RESET_FETCH_EVENTS');
export const resetUpdateEvent = createAction('RESET_UPDATE_EVENT');

export function fetchEvent(id) {
  return function (dispatch) {
    dispatch(requestEvent());

    data.request('event', 'get', id)
      .then(function (response) {
        dispatch(receiveEvent(response))
      }).catch(function (e) {
        dispatch(receiveEvent(e));
      });
  };
}

export function fetchEvents(options) {
  return function (dispatch, getState) {
    dispatch(requestEvents());

    let startDate, endDate, limit, page, closed, sortField, sortType;

    if (!_.isNil(options)) {
      ({ startDate, endDate, limit, page, closed, sortField, sortType } = options);
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

    const sort = data.constructSort(sortField, sortType);

    let query = `?${sort}&$limit=${limit}&$skip=${skip}`;

    if (startDate && endDate) {
      query += '&startDate=' + encodeURIComponent(startDate);
      query += '&endDate=' + encodeURIComponent(endDate);
    }

    if (!_.isNil(closed)) {
      query += '&closed=' + encodeURIComponent(disabled);
    }

    data.request('event', 'get', null, query, null, {
      resolve: false,
    }).then(function (response) {
      dispatch(receiveEvents(response));
    }).catch(function (e) {
      dispatch(receiveEvents(e));
    });
  };
}

export function updateEvent(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateEvent());

    data.request('event', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateEvent(response))
      }).catch(function (e) {
        dispatch(receiveUpdateEvent(e));
      });
  };
}

export function deleteEvent(id) {
  return function (dispatch) {
    dispatch(requestDeleteEvent());

    data.request('event', 'delete', id)
      .then(function (response) {
        dispatch(receiveDeleteEvent(response))
      }).catch(function (e) {
        dispatch(receiveDeleteEvent(e));
      });
  };
}

export function createEvent(body) {
  return function (dispatch) {
    dispatch(requestCreateEvent());

    data.request('event', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateEvent(response))
      }).catch(function (e) {
        dispatch(receiveCreateEvent(e));
      });
  };
}
