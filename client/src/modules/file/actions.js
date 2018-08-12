import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestCreateFile = createAction('REQUEST_CREATE_FILE');
export const receiveCreateFile = createAction('RECEIVE_CREATE_FILE');

export const resetCreateFile = createAction('RESET_CREATE_FILE');

export function uploadFile(body) {
  return function (dispatch) {
    dispatch(requestCreateFile());

    data.request('file', 'post', null, null, body, {
      serialize: false,
    }).then(function (response) {
      dispatch(receiveCreateFile(response));
    }).catch(function (e) {
      dispatch(receiveCreateFile(e));
    });
  }
}
