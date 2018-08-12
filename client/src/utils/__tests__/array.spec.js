import utils from '../array';
import chai from 'chai';

const expect = chai.expect;

describe('(Utils) Array', () => {
  describe('#updateById', () => {
    it('should update element by id', () => {
      const array = [
        { id: 3, text: 'Hello' }
      ];

      expect(utils.updateById(array, 3, { id: 3, text: 'Bye' })).to.deep.equal([{ id: 3, text: 'Bye' }]);
    });
  });

  describe('#deleteFromArrayById', () => {
    it('should delete element from array by id', () => {
      const id = 3;
      const array = [
        { id }
      ];

      expect(utils.deleteFromArrayById(array, id)).to.deep.equal([]);
    });
  });

  describe('#isObjectArray', () => {
    it('should return true if first element is an object', () => {
      const array = [
        { id: 3 }
      ];
      
      expect(utils.isObjectArray(array)).to.equal(true);
    });

    it('should return false if first element is a primitive', () => {
      const array = [3];
      
      expect(utils.isObjectArray(array)).to.equal(false);
    });

    it('should return false if first element is null or undefined', () => {
      const array = [];

      expect(utils.isObjectArray(array)).to.equal(false);
    });

    it('should return false if array is null or undefined', () => {
      expect(utils.isObjectArray()).to.equal(false);
    });
  });
});
