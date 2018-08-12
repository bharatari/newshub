import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import authentication from './authentication/reducer';
import roomReservation from './roomReservation/reducer';
import reservation from './reservation/reducer';
import device from './device/reducer';
import file from './file/reducer';
import room from './room/reducer';
import user from './user/reducer';
import role from './role/reducer';
import event from './event/reducer';
import log from './log/reducer';
import notifications from './notifications/reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    authentication,
    device,
    roomReservation,
    reservation,
    user,
    router,
    form,
    file,
    room,
    role,
    event,
    log,
    notifications,
    ...asyncReducers,
  });
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;
