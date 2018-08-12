import { injectReducer } from 'modules/';
import Route from './Route';
import reducer from './modules/reducer';

export default (store) => ((nextState, cb) => {
  injectReducer(store, { key: 'newReservation', reducer });

  cb(null, Route);
});
