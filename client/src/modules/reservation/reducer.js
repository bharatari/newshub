import { handleActions } from 'redux-actions';
import utils from 'utils/general';

export const initialState = {
  fetchReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  fetchReservations: {
    requesting: false,
    reservations: null,
    error: null,
    total: null,
    totalPages: null,
  },
  createReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  updateReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  deleteReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
};

export default handleActions({
  RESET_FETCH_RESERVATIONS: (state, action) => ({
    ...state,
    fetchReservations: {
      ...state.fetchReservations,
      requesting: false,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  REQUEST_RESERVATIONS: (state, action) => ({
    ...state,
    fetchReservations: {
      ...state.fetchReservations,
      requesting: true,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        fetchReservations: {
          ...state.fetchReservations,
          requesting: false,
          reservations: action.payload.data,
          error: null,
          total: action.payload.total,
          totalPages: utils.calculatePages(action.payload.total, action.payload.limit),
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchReservations: {
          ...state.fetchReservations,
          requesting: false,
          reservations: null,
          error: action.payload,
          total: null,
          currentPage: null,
          totalPages: null,
        },
      };
    }
  },
  REQUEST_RESERVATION: (state, action) => ({
    ...state,
    fetchReservation: {
      ...state.fetchReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_RESERVATION: (state, action) => ({
    ...state,
    createReservation: {
      ...state.createReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
  REQUEST_CREATE_RESERVATION: (state, action) => ({
    ...state,
    createReservation: {
      ...state.createReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        createReservation: {
          ...state.createReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createReservation: {
          ...state.createReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_RESERVATION: (state, action) => ({
    ...state,
    updateReservation: {
      ...state.updateReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
  REQUEST_UPDATE_RESERVATION: (state, action) => ({
    ...state,
    updateReservation: {
      ...state.updateReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        updateReservation: {
          ...state.updateReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateReservation: {
          ...state.updateReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_DELETE_RESERVATION: (state, action) => ({
    ...state,
    deleteReservation: {
      ...state.deleteReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_DELETE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        deleteReservation: {
          ...state.deleteReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        deleteReservation: {
          ...state.deleteReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
