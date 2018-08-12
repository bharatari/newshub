import React from 'react';
import { bindActionCreators } from 'redux';
import { Status } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('(Component) Status', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _wrapper = shallow(<Status {..._props} />);
  });

  it('should render as a <span>.', () => {
    expect(_wrapper.is('span')).to.equal(true);
  });
});
