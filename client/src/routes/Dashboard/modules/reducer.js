import { handleActions } from 'redux-actions';

const initialState = {
  upcomingReservations: {
    requesting: false,
    reservation: null,
    error: null,
  },
  currentReservations: {
    requesting: false,
    reservations: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_UPCOMING_RESERVATIONS: (state, action) => ({
    ...state,
    upcomingReservations: {
      ...state.upcomingReservations,
      requesting: true,
      reservations: null,
      error: null,
    },
  }),
  RECEIVE_UPCOMING_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        upcomingReservations: {
          ...state.upcomingReservations,
          requesting: false,
          reservations: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        upcomingReservations: {
          ...state.upcomingReservations,
          requesting: false,
          reservations: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_CURRENT_RESERVATIONS: (state, action) => ({
    ...state,
    currentReservations: {
      ...state.currentReservations,
      requesting: true,
      reservations: null,
      error: null,
    },
  }),
  RECEIVE_CURRENT_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        currentReservations: {
          ...state.currentReservations,
          requesting: false,
          reservations: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        currentReservations: {
          ...state.currentReservations,
          requesting: false,
          reservations: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
