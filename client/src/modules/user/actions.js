import { createAction } from 'redux-actions';
import { localStorageAuthToken } from 'constants/keys';
import data from 'utils/data';
import userUtils from './utils';
import { fetchRoles } from '../role/actions';

export const requestUser = createAction('REQUEST_USER');
export const receiveUser = createAction('RECEIVE_USER');
export const resetFetchUser = createAction('RESET_FETCH_USER');

export const requestCurrentUser = createAction('REQUEST_CURRENT_USER');
export const receiveCurrentUser = createAction('RECEIVE_CURRENT_USER');

export const requestUsers = createAction('REQUEST_USERS');
export const receiveUsers = createAction('RECEIVE_USERS');

export const requestCreateUser = createAction('REQUEST_CREATE_USER');
export const receiveCreateUser = createAction('RECEIVE_CREATE_USER');

export const requestUpdateUser = createAction('REQUEST_UPDATE_USER');
export const receiveUpdateUser = createAction('RECEIVE_UPDATE_USER');
export const resetUpdateUser = createAction('RESET_UPDATE_USER');

export const requestSwitchOrganization = createAction('REQUEST_SWITCH_ORGANIZATION');
export const receiveSwitchOrganization = createAction('RECEIVE_SWITCH_ORGANIZATION');

export function fetchUser(id) {
  return function (dispatch) {
    dispatch(requestUser());
    
    data.request('user', 'get', id)
      .then(function (user) {
        dispatch(receiveUser(user));
      }).catch(function (e) {
        dispatch(receiveUser(e));
      });
  }
}

export function fetchCurrentUser() {
  return function (dispatch) {
    dispatch(requestCurrentUser());
  
    if (localStorage.getItem(localStorageAuthToken)) {
      userUtils.getId(localStorage.getItem(localStorageAuthToken))
        .then(function (id) {
          return data.request('user', 'get', id)
            .then(function (user) {
              dispatch(receiveCurrentUser(user));
            }).catch(function (e) {
              dispatch(receiveCurrentUser(e));
            });
        }).catch(function () {
          dispatch(receiveCurrentUser(null));
        });
    } else {
      dispatch(receiveCurrentUser(null));
    }
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch(requestUsers());

    data.request('user', 'get')
      .then(function (response) {
        dispatch(receiveUsers(userUtils.processResponse(response)));
      }).catch(function (e) {
        dispatch(receiveUsers(e));
      })
  }
}

export function createUser(body) {
  return function (dispatch) {
    dispatch(requestCreateUser());

    data.request('user', 'POST', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateUser(response));
      }).catch(function (e) {
        dispatch(receiveCreateUser(e));
      })
  }
}

export function updateUser(body, userId) {
  return function (dispatch) {
    dispatch(requestUpdateUser());

    data.request('user', 'PATCH', userId, null, body)
      .then(function (user) {
        dispatch(receiveUpdateUser(user));
      }).catch(function (e) {
        dispatch(receiveUpdateUser(e));
      });
  }
}

export function switchOrganization(userId, organizationId) {
  return function (dispatch) {
    dispatch(requestSwitchOrganization());

    data.request('user', 'PATCH', userId, null, {
      currentOrganizationId: organizationId,
    }).then(function (user) {
      dispatch(receiveSwitchOrganization(user));

      dispatch(fetchCurrentUser());
      dispatch(fetchRoles());
    }).catch(function (e) {
      dispatch(receiveSwitchOrganization(e));
    });
  }
}
