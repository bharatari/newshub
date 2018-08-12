import React from 'react';
import { bindActionCreators } from 'redux';
import { FormatDate } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';
import moment from 'moment';

const expect = chai.expect;

describe('(Component) FormatDate', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _wrapper = shallow(<FormatDate {..._props} />);
  });

  it('should render as a <span>.', () => {
    expect(_wrapper.is('span')).to.equal(true);
  });

  it('should render with dynamic formatting', () => {
    const datetime = new Date();
    const format = 'mm/dd/yy';
    const expected = moment(datetime).format(format);

    _props = {
      datetime,
      format,
    };
    _wrapper = shallow(<FormatDate {..._props} />)

    expect(_wrapper.text()).to.equal(expected);
  });
  
  it('should render date', () => {
    const date = new Date();
    const format = 'MM/DD/YY';

    const expected = moment(date).format(format);

    _props = {
      date,
    };
    _wrapper = shallow(<FormatDate {..._props} />)

    expect(_wrapper.text()).to.equal(expected);
  });

  it('should render datetime', () => {
    const datetime = new Date();
    const format = 'MM/DD/YY h:mm a';
    const expected = moment(datetime).format(format);

    _props = {
      datetime,
    };
    _wrapper = shallow(<FormatDate {..._props} />)

    expect(_wrapper.text()).to.equal(expected);
  });
});
