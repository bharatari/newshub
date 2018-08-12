import { handleActions } from 'redux-actions';

const initialState = {
  searchUsers: {
    requesting: false,
    users: null,
    error: null,
  },
  createLog: {
    requesting: false,
    log: null,
    error: null,
  },
};

export default handleActions({
  'routes/Event/REQUEST_USERS': (state, action) => ({
    ...state,
    searchUsers: {
      ...state.searchUsers,
      requesting: true,
      error: null,
    },
  }),
  'routes/Event/RECEIVE_USERS': {
    next(state, action) {
      return {
        ...state,
        searchUsers: {
          ...state.searchUsers,
          requesting: false,
          users: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        searchUsers: {
          ...state.searchUsers,
          requesting: false,
          users: null,
          error: action.payload,
        },
      };
    }
  },
  'routes/Event/RESET_CREATE_LOG': (state, action) => ({
    ...state,
    createLog: {
      ...state.createLog,
      requesting: false,
      log: null,
      error: null,
    },
  }),
  'routes/Event/REQUEST_CREATE_LOG': (state, action) => ({
    ...state,
    createLog: {
      ...state.createLog,
      requesting: true,
      log: null,
      error: null,
    },
  }),
  'routes/Event/RECEIVE_CREATE_LOG': {
    next(state, action) {
      return {
        ...state,
        createLog: {
          ...state.createLog,
          requesting: false,
          log: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createLog: {
          ...state.createLog,
          requesting: false,
          log: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
