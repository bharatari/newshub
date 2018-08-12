import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestCreateToken = createAction('routes/ResetPassword/REQUEST_CREATE_TOKEN');
export const receiveCreateToken = createAction('routes/ResetPassword/RECEIVE_CREATE_TOKEN');

export function createToken(body) {
  return function (dispatch) {
    dispatch(requestCreateToken());

    data.request('reset-password', 'POST', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateToken(response))
      }).catch(function (e) {
        dispatch(receiveCreateToken(e));
      });
  };
}
