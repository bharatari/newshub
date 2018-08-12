import { createAction } from 'redux-actions';
import { localStorageAuthToken } from 'constants/keys';
import data from 'utils/data';
import { resetRoles } from '../role/actions';

export const resetLogin = createAction('RESET_LOGIN');
export const requestLogin = createAction('REQUEST_LOGIN');
export const receiveLogin = createAction('RECEIVE_LOGIN');

export const requestLogout = createAction('REQUEST_LOGOUT');
 
export function login(body) {
  return function (dispatch) {
    const request = {
      strategy: 'local',
      ...body,
    };

    dispatch(requestLogin());

    data.request('login', 'post', null, null, request, {
      resolve: false,
    }).then(function (body) {
      localStorage.setItem(localStorageAuthToken, body.accessToken);
      dispatch(receiveLogin(body));
    }).catch(function (e) {
      dispatch(receiveLogin(e));
    });
  }
}

export function logout() {
  return function (dispatch) {
    localStorage.removeItem(localStorageAuthToken);

    dispatch(resetRoles());
    dispatch(requestLogout());
  }
}
