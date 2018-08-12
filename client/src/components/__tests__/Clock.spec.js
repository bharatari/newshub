import React from 'react';
import { bindActionCreators } from 'redux';
import { Clock } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('(Component) Clock', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _wrapper = shallow(<Clock {..._props} />);
  });

  it('should render as a <span>.', () => {
    expect(_wrapper.is('span')).to.equal(true);
  });
});
