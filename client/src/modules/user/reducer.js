import { handleActions } from 'redux-actions';

const initialState = {
  fetchUser: {
    requesting: false,
    user: null,
    error: null,
  },
  fetchCurrentUser: {
    requesting: false,
    user: null,
    error: null,
  },
  fetchUsers: {
    requesting: false,
    users: null,
    error: null,
    total: null,
  },
  createUser: {
    requesting: false,
    user: null,
    error: null,
  },
  updateUser: {
    requesting: false,
    user: null,
    error: null,
  },
  switchOrganization: {
    requesting: false,
    user: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_USER: (state, action) => ({
    ...state,
    fetchUser: {
      ...state.fetchUser,
      requesting: true,
      error: null,
    },
  }),
  RECEIVE_USER: {
    next(state, action) {
      return {
        ...state,
        fetchUser: {
          ...state.fetchUser,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchUser: {
          ...state.fetchUser,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_FETCH_USER: (state, action) => ({
    ...state,
    fetchUser: {
      ...state.fetchUser,
      requesting: false,
      error: null,
      user: null,
    },
  }),
  REQUEST_CURRENT_USER: (state, action) => ({
    ...state,
    fetchCurrentUser: {
      ...state.fetchCurrentUser,
      requesting: true,
      error: null,
    },
  }),
  RECEIVE_CURRENT_USER: {
    next(state, action) {
      return {
        ...state,
        fetchCurrentUser: {
          ...state.fetchCurrentUser,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchCurrentUser: {
          ...state.fetchCurrentUser,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_USERS: (state, action) => ({
    ...state,
    fetchUsers: {
      ...state.fetchUsers,
      requesting: true,
      users: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_USERS: {
    next(state, action) {
      return {
        ...state,
        fetchUsers: {
          ...state.fetchUsers,
          requesting: false,
          users: action.payload.data,
          error: null,
          total: action.payload.total,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchUsers: {
          ...state.fetchUsers,
          requesting: false,
          users: null,
          error: action.payload,
          total: null,
        },
      };
    }
  },
  REQUEST_CREATE_USER: (state, action) => ({
    ...state,
    createUser: {
      ...state.createUser,
      requesting: true,
      user: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_USER: {
    next(state, action) {
      return {
        ...state,
        createUser: {
          ...state.createUser,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createUser: {
          ...state.createUser,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_UPDATE_USER: (state, action) => ({
    ...state,
    updateUser: {
      ...state.updateUser,
      requesting: true,
      user: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_USER: {
    next(state, action) {
      return {
        ...state,
        updateUser: {
          ...state.updateUser,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateUser: {
          ...state.updateUser,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_UPDATE_USER: (state, action) => ({
    ...state,
    updateUser: {
      ...state.updateUser,
      requesting: false,
      error: null,
      user: null,
    },
  }),
  REQUEST_SWITCH_ORGANIZATION: (state, action) => ({
    ...state,
    switchOrganization: {
      ...state.switchOrganization,
      requesting: true,
      user: null,
      error: null,
    },
  }),
  RECEIVE_SWITCH_ORGANIZATION: {
    next(state, action) {
      return {
        ...state,
        switchOrganization: {
          ...state.switchOrganization,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        switchOrganization: {
          ...state.switchOrganization,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
