import { handleActions } from 'redux-actions';

const initialState = {
  requesting: false,
  response: null,
  error: null,
};

export default handleActions({
  'routes/ResetPassword/REQUEST_CREATE_TOKEN': (state, action) => ({
    ...state,
    requesting: true,
    response: null,
    error: null,
  }),
  'routes/ResetPassword/RECEIVE_CREATE_TOKEN': {
    next(state, action) {
      return {
        ...state,
        requesting: false,
        response: action.payload,
        error: null,
      };
    },
    throw(state, action) {
      return {
        ...state,
        requesting: false,
        response: null,
        error: action.payload,
      };
    }
  },
}, initialState);
