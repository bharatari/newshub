import React from 'react';
import { bindActionCreators } from 'redux';
import { Card } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('(Component) Card', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _wrapper = shallow(<Card {..._props} />);
  });

  it('should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true);
  });

  it('should render eight columns by default', () => {
    expect(_wrapper.hasClass('eight wide column')).to.be.true;
  });

  it('should render custom columns if provided', () => {
    _props = {
      column: 'two',
    };
    _wrapper = shallow(<Card {..._props} />);

    expect(_wrapper.hasClass('two wide column')).to.be.true;
  });

  it('should render background color', () => {
    _props = {
      background: '#FFF',
    };
    _wrapper = shallow(<Card {..._props} />);

    expect(_wrapper.childAt(0).prop('style')).to.have.property('backgroundColor').and.equal('#FFF');
  });
});
