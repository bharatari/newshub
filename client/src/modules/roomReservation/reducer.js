import { handleActions } from 'redux-actions';
import utils from 'utils/general';

const initialState = {
  fetchRoomReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  fetchRoomReservations: {
    requesting: false,
    reservations: null,
    error: null,
    total: null,
    totalPages: null,
  },
  createRoomReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  updateRoomReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
};

export default handleActions({
  RESET_FETCH_ROOM_RESERVATIONS: (state, action) => ({
    ...state,
    fetchRoomReservations: {
      ...state.fetchRoomReservations,
      requesting: false,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  REQUEST_ROOM_RESERVATIONS: (state, action) => ({
    ...state,
    fetchRoomReservations: {
      ...state.fetchRoomReservations,
      requesting: true,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_ROOM_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        fetchRoomReservations: {
          ...state.fetchRoomReservations,
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
        fetchRoomReservations: {
          ...state.fetchRoomReservations,
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
  REQUEST_ROOM_RESERVATION: (state, action) => ({
    ...state,
    fetchRoomReservation: {
      ...state.fetchRoomReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_ROOM_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        fetchRoomReservation: {
          ...state.fetchRoomReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchRoomReservation: {
          ...state.fetchRoomReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_ROOM_RESERVATION: (state, action) => ({
    ...state,
    createRoomReservation: {
      ...state.createRoomReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
  REQUEST_CREATE_ROOM_RESERVATION: (state, action) => ({
    ...state,
    createRoomReservation: {
      ...state.createRoomReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_ROOM_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        createRoomReservation: {
          ...state.createRoomReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createRoomReservation: {
          ...state.createRoomReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_ROOM_RESERVATION: (state, action) => ({
    ...state,
    updateRoomReservation: {
      ...state.updateRoomReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
  REQUEST_UPDATE_ROOM_RESERVATION: (state, action) => ({
    ...state,
    updateRoomReservation: {
      ...state.updateRoomReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_ROOM_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        updateRoomReservation: {
          ...state.updateRoomReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateRoomReservation: {
          ...state.updateRoomReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
