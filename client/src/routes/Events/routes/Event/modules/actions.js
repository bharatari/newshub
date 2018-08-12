import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestUsers = createAction('routes/Event/REQUEST_USERS');
export const receiveUsers = createAction('routes/Event/RECEIVE_USERS');

export const requestCreateLog = createAction('routes/Event/REQUEST_CREATE_LOG');
export const receiveCreateLog = createAction('routes/Event/RECEIVE_CREATE_LOG');

export const resetCreateLog = createAction('routes/Event/RESET_CREATE_LOG');

export function searchUsers(options) {
  return function (dispatch) {
    dispatch(requestUsers());

    if (options) {
      let query = "?";

      const { search } = options;

      if (search) {
        query += 'search=' + encodeURIComponent(search);
      }

      data.request('user', 'get', null, query, null)
        .then(function (response) {
          dispatch(receiveUsers(response));
        }).catch(function (e) {
          dispatch(receiveUsers(e));
        })
    } else {
      data.request('user', 'get')
        .then(function (response) {
          dispatch(receiveUsers(response));
        }).catch(function (e) {
          dispatch(receiveUsers(e));
        })
    }
  }
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
