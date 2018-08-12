import React from 'react';
import { bindActionCreators } from 'redux';
import { Paginator } from 'components/';
import { shallow } from 'enzyme';
import chai from 'chai';
import moment from 'moment';
import sinon from 'sinon';

const expect = chai.expect;

describe('(Component) Paginator', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      currentPage: 1,
      totalPages: 1,
      goToPage: sinon.spy(),
    };
    _wrapper = shallow(<Paginator {..._props} />);
  });

  it('should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true);
  });

  describe('#previousFive', () => {
    it('should return empty array when on first page', () => {
      _props = {
        currentPage: 1,
        totalPages: 4,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.previousFive()).to.deep.equal([]);
    });

    it('should return previous few pages (omitting the first)', () => {
      _props = {
        currentPage: 4,
        totalPages: 4,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.previousFive()).to.deep.equal([2, 3]);
    });

    it('should return previous five pages (omitting the first)', () => {
      _props = {
        currentPage: 15,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.previousFive()).to.deep.equal([10, 11, 12, 13, 14]);
    });
  });
  
  describe('#nextFive', () => {
    it('should return empty array when on last page', () => {
      _props = {
        currentPage: 4,
        totalPages: 4,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.nextFive()).to.deep.equal([]);
    });

    it('should return next few pages (omitting the last)', () => {
      _props = {
        currentPage: 11,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.nextFive()).to.deep.equal([12, 13, 14]);
    });

    it('should return next five pages (omitting the last)', () => {
      _props = {
        currentPage: 7,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.nextFive()).to.deep.equal([8, 9, 10, 11, 12]);
    });
  });

  describe('#onLastPage', () => {
    it('should return true when on last page', () => {
       _props = {
        currentPage: 15,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onLastPage()).to.equal(true);
    });

    it('should return false when not on last page', () => {
      _props = {
        currentPage: 14,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onLastPage()).to.equal(false);
    });

    it('should return false when 0', () => {
      _props = {
        currentPage: 0,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onLastPage()).to.equal(false);
    });

    it('should return false when undefined', () => {
      _props = {
        currentPage: undefined,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onLastPage()).to.equal(false);
    });
  });

  describe('#onFirstPage', () => {
    it('should return true when on first page', () => {
      _props = {
        currentPage: 1,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onFirstPage()).to.equal(true);
    });

    it('should return false when not on first page', () => {
      _props = {
        currentPage: 12,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onFirstPage()).to.equal(false);
    });

    it('should return false when 0', () => {
      _props = {
        currentPage: 0,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onFirstPage()).to.equal(false);
    });

    it('should return false when undefined', () => {
       _props = {
        currentPage: undefined,
        totalPages: 15,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.onFirstPage()).to.equal(false);
    });
  });

  describe('#pages', () => {
    it('should return array of pages', () => {
      _props = {
        currentPage: 1,
        totalPages: 6,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.pages()).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    it('should return empty array for 0 pages', () => {
      _props = {
        currentPage: 1,
        totalPages: 0,
        goToPage: sinon.spy(),
      };

      _wrapper = shallow(<Paginator {..._props} />);

      const component = _wrapper.instance();

      expect(component.pages()).to.deep.equal([]);
    });
  });
});
