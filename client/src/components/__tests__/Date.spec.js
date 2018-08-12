import React from 'react';
import { bindActionCreators } from 'redux';
import { Date } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('(Component) Date', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _wrapper = shallow(<Date {..._props} />);
  });

  it('should render as a <span>.', () => {
    expect(_wrapper.is('span')).to.equal(true);
  });
});
