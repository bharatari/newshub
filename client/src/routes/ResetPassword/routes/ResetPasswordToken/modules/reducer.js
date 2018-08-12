import { handleActions } from 'redux-actions';

const initialState = {
  requesting: false,
  response: null,
  error: null,
};

export default handleActions({
  'routes/ResetPasswordToken/REQUEST_UPDATE_USER': (state, action) => ({
    ...state,
    requesting: true,
    response: null,
    error: null,
  }),
  'routes/ResetPasswordToken/RECEIVE_UPDATE_USER': {
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
