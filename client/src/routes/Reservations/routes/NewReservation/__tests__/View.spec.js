import React from 'react';
import { bindActionCreators } from 'redux';
import View from 'routes/Reservations/routes/NewReservation/View';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

describe('(View) Dashboard', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      actions: {},
      localActions: {},
    };
  });

  it('should render as a <div>', () => {
    _wrapper = shallow(<View {..._props} />);

    expect(_wrapper.is('div')).to.equal(true);
  });
});
