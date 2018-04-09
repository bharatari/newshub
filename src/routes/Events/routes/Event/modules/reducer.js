import { handleActions } from 'redux-actions';

const initialState = {
  searchUsers: {
    requesting: false,
    users: null,
    error: null,
  },
};

export default handleActions({
  'routes/Event/REQUEST_USERS': (state, action) => ({
    ...state,
    searchUsers: {
      ...state.searchUsers,
      requesting: true,
      users: null,
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
}, initialState);
