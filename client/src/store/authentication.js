import { loginRedirect } from 'constants/keys';
import { logout } from 'modules/authentication/actions';

export default store => next => action => {
  if (action.payload) {
    if (action.payload.message === 'NOT_AUTHENTICATED') {
      const state = store.getState();

      if (state.router.locationBeforeTransitions.pathname === loginRedirect) {
        return next(action);
      } else {
        store.dispatch(logout());
      }
    }
  }
  
  return next(action);
}
