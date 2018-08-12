import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestRoles = createAction('REQUEST_ROLES');
export const receiveRoles = createAction('RECEIVE_ROLES');

export const resetRoles = createAction('RESET_ROLES');

export function fetchRoles() {
  return function (dispatch) {
    dispatch(requestRoles());

    const query = {
      roles: 'all',
    };

    data.request('role', 'get', null, query, null, {
      resolve: false,
    }).then(function (roles) {
      dispatch(receiveRoles(roles));
    }).catch(function (e) {
      dispatch(receiveRoles(e));
    });
  }
}
