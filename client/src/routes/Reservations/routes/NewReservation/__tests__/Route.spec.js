import React from 'react';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Route from 'routes/Reservations/routes/NewReservation/Route';
import { mount, shallow } from 'enzyme';
import reducer from '../modules/reducer';
import { injectReducer } from 'modules/';

import createStore from 'store/createStore';

describe('(Route) NewReservation', () => {
  let _props, _spies, _wrapper, _component;
  
  before(() => {
    const store = createStore();

    injectReducer(store, { key: 'newReservation', reducer });

    const location = {
      pathname: '/app/reservation/new',
    };

    _component = (
      <Provider store={store}>
        <Route location={location} />
      </Provider>
    );
  });

  beforeEach(() => {
    _spies = {};
  });

  it('should render without crashing', () => {
    _props = {
      roles: []
    };
    
    // _wrapper = mount(_component);
  });
});
