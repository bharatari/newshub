import React from 'react';
import { bindActionCreators } from 'redux';
import { Response } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('(Component) Response', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
  });

  it('should render null for no response', () => {
    _props = {};
    _wrapper = shallow(<Response {..._props} />);

    expect(_wrapper.is('div')).to.equal(false);
  });
  it('should render as a <div>.', () => {
    _props = {
      response: true,
    };
    _wrapper = shallow(<Response {..._props} />);

    expect(_wrapper.is('div')).to.equal(true);
  });

  it('should render success message', () => {
    _props = {
      response: true,
      successHeader: 'Success',
      successText: 'It worked',
    };
    _wrapper = shallow(<Response {..._props} />);

    expect(_wrapper.hasClass('ui success')).to.be.true;
    expect(_wrapper.html()).to.contain(_props.successHeader);
    expect(_wrapper.html()).to.contain(_props.successText);
  });

  it('should render error message', () => {
    _props = {
      error: true,
      errorHeader: 'Error',
      errorText: 'It failed',
    };
    _wrapper = shallow(<Response {..._props} />);

    expect(_wrapper.hasClass('ui error')).to.be.true;
    expect(_wrapper.html()).to.contain(_props.errorHeader);
    expect(_wrapper.html()).to.contain(_props.errorText);
  });
});
