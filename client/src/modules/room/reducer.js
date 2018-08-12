import { handleActions } from 'redux-actions';

const initialState = {
  fetchRooms: {
    requesting: false,
    rooms: null,
    error: null,
    total: null,
  },
  fetchRoom: {
    requesting: false,
    room: null,
    error: null,
  },
  createRoom: {
    requesting: false,
    room: null,
    error: null,
  },
  updateRoom: {
    requesting: false,
    room: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_ROOMS: (state, action) => ({
    ...state,
    fetchRooms: {
      ...state.fetchRooms,
      requesting: true,
      total: null,
    },
  }),
  RECEIVE_ROOMS: {
    next(state, action) {
      return {
        ...state,
        fetchRooms: {
          ...state.fetchRooms,
          requesting: false,
          rooms: action.payload.data,
          error: null,
          total: action.payload.total,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchRooms: {
          ...state.fetchRooms,
          requesting: false,
          rooms: null,
          error: action.payload,
          total: null,
        },
      };
    }
  },
  REQUEST_ROOM: (state, action) => ({
    ...state,
    fetchRoom: {
      ...state.fetchRoom,
      requesting: true,
      room: null,
      error: null,
    },
  }),
  RECEIVE_ROOM: {
    next(state, action) {
      return {
        ...state,
        fetchRoom: {
          ...state.fetchRoom,
          requesting: false,
          room: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchRoom: {
          ...state.fetchRoom,
          requesting: false,
          room: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_ROOM: (state, action) => ({
    ...state,
    createRoom: {
      ...state.createRoom,
      requesting: false,
      room: null,
      error: null,
    },
  }),
  REQUEST_CREATE_ROOM: (state, action) => ({
    ...state,
    createRoom: {
      ...state.createRoom,
      requesting: true,
      room: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_ROOM: {
    next(state, action) {
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          requesting: false,
          room: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          requesting: false,
          room: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_UPDATE_ROOM: (state, action) => ({
    ...state,
    updateRoom: {
      ...state.updateRoom,
      requesting: true,
      room: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_ROOM: {
    next(state, action) {
      return {
        ...state,
        updateRoom: {
          ...state.updateRoom,
          requesting: false,
          room: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateRoom: {
          ...state.updateRoom,
          requesting: false,
          room: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_ROOM: (state, action) => ({
    ...state,
    updateRoom: {
      ...state.updateRoom,
      requesting: false,
      room: null,
      error: null,
    },
  }),
}, initialState);
