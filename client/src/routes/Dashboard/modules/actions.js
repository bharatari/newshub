import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestUpcomingReservations = createAction('REQUEST_UPCOMING_RESERVATIONS');
export const receiveUpcomingReservations = createAction('RECEIVE_UPCOMING_RESERVATIONS');

export const requestCurrentReservations = createAction('REQUEST_CURRENT_RESERVATIONS');
export const receiveCurrentReservations = createAction('RECEIVE_CURRENT_RESERVATIONS');

export function fetchUpcomingReservations() {
  return function (dispatch) {
    dispatch(requestUpcomingReservations());

    let query = '?$sort[createdAt]=-1&$limit=5&checkedOut=false&disabled=false';

    data.request('reservation', 'get', null, query)
      .then(function (response) {
        dispatch(receiveUpcomingReservations(response))
      }).catch(function (e) {
        dispatch(receiveUpcomingReservations(e));
      });
  };
}

export function fetchCurrentReservations() {
  return function (dispatch) {
    dispatch(requestCurrentReservations());

    let query = '?$sort[createdAt]=-1&$limit=5&checkedOut=true&checkedIn=false';

    data.request('reservation', 'get', null, query)
      .then(function (response) {
        dispatch(receiveCurrentReservations(response));
      }).catch(function (e) {
        dispatch(receiveCurrentReservations(e));
      });
  };
}