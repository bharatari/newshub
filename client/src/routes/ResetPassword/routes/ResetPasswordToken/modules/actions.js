import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestUpdateUser = createAction('routes/ResetPasswordToken/REQUEST_UPDATE_USER');
export const receiveUpdateUser = createAction('routes/ResetPasswordToken/RECEIVE_UPDATE_USER');

export function updateUser(body) {
  return function (dispatch) {
    dispatch(requestUpdateUser());

    data.request('reset-password', 'PATCH', null, null, body)
      .then(function (user) {
        dispatch(receiveUpdateUser(user));
      }).catch(function (e) {
        dispatch(receiveUpdateUser(e));
      });
  }
}
