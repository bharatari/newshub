import { handleActions } from 'redux-actions';

const initialState = {
  createFile: {
    requesting: false,
    error: null,
    file: null,
  },
};

export default handleActions({
  REQUEST_CREATE_FILE: (state) => ({
    ...state,
    createFile: {
      ...state.createFile,
      requesting: true,
      error: null,
      file: null,
    },
  }),
  RECEIVE_CREATE_FILE: {
    next(state, action) {
      return {
        ...state,
        createFile: {
          ...state.createFile,
          requesting: false,
          error: null,
          file: action.payload,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createFile: {
          ...state.createFile,
          requesting: false,
          error: action.payload,
          file: null,
        },
      };
    },
  },
  RESET_CREATE_FILE: (state, action) => ({
    ...state,
    createFile: {
      ...state.createFile,
      requesting: false,
      file: null,
      error: null,
    },
  }),
}, initialState);
