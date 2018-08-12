import general from '../general';
import chai from 'chai';

const expect = chai.expect;

describe('(Utils) General', () => {
  describe('#calculatePages', () => {
    it('should calculate total number of pages', () => {
      const total = 98;
      const limit = 5;
      const expected = 20;

      expect(general.calculatePages(total, limit)).to.equal(expected);
    });
  });

  describe('#getCurrentPage', () => {
    it('should calculate current page', () => {
      const limit = 10;
      const skip = 20;
      const expected = 3;

      expect(general.getCurrentPage(limit, skip)).to.equal(expected);
    });

    it('should calculate current page', () => {
      const limit = 10;
      const skip = 10;
      const expected = 2;

      expect(general.getCurrentPage(limit, skip)).to.equal(expected);
    });

    it('should calculate current page', () => {
      const limit = 10;
      const skip = 0;
      const expected = 1;

      expect(general.getCurrentPage(limit, skip)).to.equal(expected);
    });
  });
});
