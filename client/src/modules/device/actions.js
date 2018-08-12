import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';

export const requestDevices = createAction('REQUEST_DEVICES');
export const receiveDevices = createAction('RECEIVE_DEVICES');

export const requestDevice = createAction('REQUEST_DEVICE');
export const receiveDevice = createAction('RECEIVE_DEVICE');

export const requestCreateDevice = createAction('REQUEST_CREATE_DEVICE');
export const receiveCreateDevice = createAction('RECEIVE_CREATE_DEVICE');
export const resetCreateDevice = createAction('RESET_CREATE_DEVICE');

export const requestUpdateDevice = createAction('REQUEST_UPDATE_DEVICE');
export const receiveUpdateDevice = createAction('RECEIVE_UPDATE_DEVICE');
export const resetUpdateDevice = createAction('RESET_UPDATE_DEVICE');

export const requestDeleteDevice = createAction('REQUEST_DELETE_DEVICE');
export const receiveDeleteDevice = createAction('RECEIVE_DELETE_DEVICE');

export function fetchDevices(options) {
  return function (dispatch) {
    dispatch(requestDevices());

    let startDate, endDate, all, limit, page, disabled, sortField, sortType;

    if (!_.isNil(options)) {
      ({ startDate, endDate, all, limit, page, disabled, sortField, sortType } = options);
    }

    let query;

    if (all) {
      if (_.isNil(sortField)) {
        sortField = 'createdAt';
      }
  
      if (_.isNil(sortType)) {
        sortType = 'DESC';
      }

      const sort = data.constructSort(sortField, sortType);
  
      query = `?${sort}&$limit=-1`;
  
      if (startDate && endDate) {
        query += '&startDate=' + encodeURIComponent(startDate);
        query += '&endDate=' + encodeURIComponent(endDate);
      }
  
      if (!_.isNil(disabled)) {
        query += '&disabled=' + encodeURIComponent(disabled);
      }
    } else {
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
  
      query = `?${sort}&$limit=${limit}&$skip=${skip}`;
  
      if (startDate && endDate) {
        query += '&startDate=' + encodeURIComponent(startDate);
        query += '&endDate=' + encodeURIComponent(endDate);
      }
  
      if (!_.isNil(disabled)) {
        query += '&disabled=' + encodeURIComponent(disabled);
      }
    }

    data.request('device', 'get', null, query, null, {
      resolve: false,
    }).then(function (response) {
      dispatch(receiveDevices(response));
    }).catch(function (e) {
      dispatch(receiveDevices(e));
    });
  };
}

export function fetchDevice(id) {
  return function (dispatch) {
    dispatch(requestDevice());

    data.request('device', 'get', id)
      .then(function (response) {
        dispatch(receiveDevice(response));
      }).catch(function (e) {
        dispatch(receiveDevice(e));
      });
  };
}

export function createDevice(body) {
  return function (dispatch) {
    dispatch(requestCreateDevice());

    data.request('device', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateDevice(response));
      }).catch(function (e) {
        dispatch(receiveCreateDevice(e));
      });
  };
}

export function updateDevice(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateDevice());

    data.request('device', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateDevice(response));
      }).catch(function (e) {
        dispatch(receiveUpdateDevice(e));
      });
  };
}
