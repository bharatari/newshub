import { createAction } from 'redux-actions';
import data from 'utils/data';

export const showModal = createAction('routes/NewReservation/SHOW_MODAL');
export const hideModal = createAction('routes/NewReservation/HIDE_MODAL');

export const requestReservation = createAction('routes/NewReservation/REQUEST_RESERVATION');
export const receiveReservation = createAction('routes/NewReservation/RECEIVE_RESERVATION');
export const resetFetchReservation = createAction('routes/NewReservation/RESET_FETCH_RESERVATION');

export const requestDevice = createAction('routes/NewReservation/REQUEST_DEVICE');
export const receiveDevice = createAction('routes/NewReservation/RECEIVE_DEVICE');
export const resetFetchDevice = createAction('routes/NewReservation/RESET_FETCH_DEVICE');

export const setWizardValue = createAction('routes/NewReservation/SET_WIZARD_VALUE');

export function fetchDeviceByBarcode(barcode) {
  return function (dispatch) {
    dispatch(requestDevice());

    const query = {
      barcode,
    };

    data.request('device', 'get', null, query)
      .then(function (response) {
        if (response) {
          if (response.length > 0) {
            dispatch(receiveDevice(response[0]));
          } else {
            dispatch(receiveDevice({}));
          }
        } else {
          dispatch(receiveDevice({}));
        }
      }).catch(function (e) {
        dispatch(receiveDevice(e));
      });
  };
}

export function fetchReservation(id) {
  return function (dispatch) {
    dispatch(requestReservation());

    data.request('reservation', 'get', id)
      .then(function (response) {
        dispatch(receiveReservation(response));
        dispatch(showModal());
      }).catch(function (e) {
        dispatch(receiveReservation(e));
      });
  };
}

export function resetReservation() {
  return function (dispatch) {
    dispatch(hideModal());
    dispatch(clearFetchReservation());
  };
}