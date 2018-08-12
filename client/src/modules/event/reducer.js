import { handleActions } from 'redux-actions';
import utils from 'utils/general';

const initialState = {
  fetchEvent: {
    requesting: false,
    event: null,
    error: null,
  },
  fetchEvents: {
    requesting: false,
    events: null,
    error: null,
    total: null,
    totalPages: null,
  },
  createEvent: {
    requesting: false,
    event: null,
    error: null,
  },
  updateEvent: {
    requesting: false,
    event: null,
    error: null,
  },
  deleteEvent: {
    requesting: false,
    event: null,
    error: null,
  },
};

export default handleActions({
  RESET_FETCH_EVENTS: (state, action) => ({
    ...state,
    fetchEvents: {
      ...state.fetchEvents,
      requesting: false,
      events: null,
      error: null,
      total: null,
    },
  }),
  REQUEST_EVENTS: (state, action) => ({
    ...state,
    fetchEvents: {
      ...state.fetchEvents,
      requesting: true,
      events: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_EVENTS: {
    next(state, action) {
      return {
        ...state,
        fetchEvents: {
          ...state.fetchEvents,
          requesting: false,
          events: action.payload.data,
          error: null,
          total: action.payload.total,
          totalPages: utils.calculatePages(action.payload.total, action.payload.limit),
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchEvents: {
          ...state.fetchEvents,
          requesting: false,
          events: null,
          error: action.payload,
          total: null,
          currentPage: null,
          totalPages: null,
        },
      };
    }
  },
  REQUEST_EVENT: (state, action) => ({
    ...state,
    fetchEvent: {
      ...state.fetchEvent,
      requesting: true,
      error: null,
    },
  }),
  RECEIVE_EVENT: {
    next(state, action) {
      return {
        ...state,
        fetchEvent: {
          ...state.fetchEvent,
          requesting: false,
          event: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchEvent: {
          ...state.fetchEvent,
          requesting: false,
          event: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_EVENT: (state, action) => ({
    ...state,
    createEvent: {
      ...state.createEvent,
      requesting: false,
      event: null,
      error: null,
    },
  }),
  REQUEST_CREATE_EVENT: (state, action) => ({
    ...state,
    createEvent: {
      ...state.createEvent,
      requesting: true,
      event: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_EVENT: {
    next(state, action) {
      return {
        ...state,
        createEvent: {
          ...state.createEvent,
          requesting: false,
          event: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createEvent: {
          ...state.createEvent,
          requesting: false,
          event: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_EVENT: (state, action) => ({
    ...state,
    updateEvent: {
      ...state.updateEvent,
      requesting: false,
      event: null,
      error: null,
    },
  }),
  REQUEST_UPDATE_EVENT: (state, action) => ({
    ...state,
    updateEvent: {
      ...state.updateEvent,
      requesting: true,
      event: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_EVENT: {
    next(state, action) {
      return {
        ...state,
        updateEvent: {
          ...state.updateEvent,
          requesting: false,
          event: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateEvent: {
          ...state.updateEvent,
          requesting: false,
          event: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_DELETE_EVENT: (state, action) => ({
    ...state,
    deleteEvent: {
      ...state.deleteEvent,
      requesting: true,
      event: null,
      error: null,
    },
  }),
  RECEIVE_DELETE_EVENT: {
    next(state, action) {
      return {
        ...state,
        deleteEvent: {
          ...state.deleteEvent,
          requesting: false,
          event: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        deleteEvent: {
          ...state.deleteEvent,
          requesting: false,
          event: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
