import { handleActions } from 'redux-actions';

const initialState = {
  notifications: [],
};

export default handleActions({
  UPDATE_NOTIFICATIONS: (state, action) => ({
    ...state,
    notifications: action.payload,
  }),
}, initialState);
