import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';
import _ from 'lodash';

export const requestLogs = createAction('REQUEST_LOGS');
export const receiveLogs = createAction('RECEIVE_LOGS');

export const requestLog = createAction('REQUEST_LOG');
export const receiveLog = createAction('RECEIVE_LOG');

export const requestCreateLog = createAction('REQUEST_CREATE_LOG');
export const receiveCreateLog = createAction('RECEIVE_CREATE_LOG');

export const requestUpdateLog = createAction('REQUEST_UPDATE_LOG');
export const receiveUpdateLog = createAction('RECEIVE_UPDATE_LOG');

export const requestDeleteLog = createAction('REQUEST_DELETE_LOG');
export const receiveDeleteLog = createAction('RECEIVE_DELETE_LOG');

export const resetCreateLog = createAction('RESET_CREATE_LOG');
export const resetFetchLogs = createAction('RESET_FETCH_LOGS');
export const resetUpdateLog = createAction('RESET_UPDATE_LOG');

export function fetchLog(id) {
  return function (dispatch) {
    dispatch(requestLog());

    data.request('log', 'get', id)
      .then(function (response) {
        dispatch(receiveLog(response))
      }).catch(function (e) {
        dispatch(receiveLog(e));
      });
  };
}

export function fetchLogs(options) {
  return function (dispatch, getState) {
    dispatch(requestLogs());

    let startDate, endDate, limit, page, closed, sortField, sortType, eventId;

    if (!_.isNil(options)) {
      ({ startDate, endDate, limit, page, closed, sortField, sortType, eventId } = options);
    }
    
    if (_.isNil(limit)) {
      limit = 10;
    }

    if (_.isNil(page)) {
      page = 1;
    }

    const skip = data.pageToSkip(page, limit);

    if (_.isNil(sortField)) {
      sortField = 'date';
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

    if (!_.isNil(eventId)) {
      query += '&eventId=' + encodeURIComponent(eventId);
    }

    data.request('log', 'get', null, query, null, {
      resolve: false,
    }).then(function (response) {
      dispatch(receiveLogs(response));
    }).catch(function (e) {
      dispatch(receiveLogs(e));
    });
  };
}

export function updateLog(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateLog());

    data.request('log', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateLog(response))
      }).catch(function (e) {
        dispatch(receiveUpdateLog(e));
      });
  };
}

export function createLog(body) {
  return function (dispatch) {
    dispatch(requestCreateLog());

    data.request('log', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateLog(response))
      }).catch(function (e) {
        dispatch(receiveCreateLog(e));
      });
  };
}
