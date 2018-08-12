import { handleActions } from 'redux-actions';

const initialState = {
  fetchRoles: {
    requesting: false,
    roles: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_ROLES: (state, action) => ({
    ...state,
    fetchRoles: {
      ...state.fetchRoles,
      requesting: true,
      roles: null,
      error: null,
    },
  }),
  RECEIVE_ROLES: {
    next(state, action) {
      return {
        ...state,
        fetchRoles: {
          ...state.fetchRoles,
          requesting: false,
          roles: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchRoles: {
          ...state.fetchRoles,
          requesting: false,
          roles: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_ROLES: (state, action) => ({
    ...state,
    fetchRoles: {
      ...state.fetchRoles,
      requesting: false,
      roles: null,
      error: null,
    },
  }),
}, initialState);
