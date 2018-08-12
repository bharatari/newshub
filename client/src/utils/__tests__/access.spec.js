import access from '../access';
import chai from 'chai';

const expect = chai.expect;

describe('(Utils) Access', () => {
  describe('#convertToPermission', () => {
    it('should convert new url to permission', () => {
      const expected = 'reservation:create';
      const url = '/app/reservation/new';

      expect(access.convertToPermission(url)).to.equal(expected);
    });

    it('should convert item url to permission', () => {
      const expected = 'reservation:read'
      const url = '/app/reservation/84';

      expect(access.convertToPermission(url)).to.equal(expected);
    });

    it('should convert items url to permission', () => {
      const expected = 'reservation:read'
      const url = '/app/reservation';

      expect(access.convertToPermission(url)).to.equal(expected);
    });
  });
  describe('#has', () => {
    it('should return true if no role is passed', () => {
      const expected = true;
      const roles = ['admin', 'device:create'];

      expect(access.has(roles)).to.equal(expected);
    });

    it('should return false if role is passed but role does not exist', () => {
      const expected = false;
      const roles = ['admin', 'device:read', 'device:create'];
      const role = 'device:update';

      expect(access.has(roles, role)).to.equal(expected);
    });

    it('should return true if role exists', () => {
      const expected = true;
      const roles = ['admin', 'device:read', 'device:create'];
      const role = 'device:read';

      expect(access.has(roles, role)).to.equal(expected);
    });

    it('should return false if deny permission exists', () => {
      const expected = false;
      const roles = ['admin', 'deny!device:read', 'device:create'];
      const role = 'device:read';

      expect(access.has(roles, role)).to.equal(expected);
    });
  });
  describe('#getRole', () => {
    it('should return corresponding role for url', () => {
      const routes = [
        { url: '/app/user/new', sidebar: false, role: 'user:create' },
        { url: '/app/device/new', sidebar: false, role: 'device:create' },
        { url: '/app/project/new', sidebar: false, role: 'project:create' },
      ];
      const url = '/app/user/new';
      const expected = 'user:create';

      expect(access.getRole(url)).to.equal(expected);
    });
    it('should return empty string if route does not exist', () => {
      const routes = [
        { url: '/app/user/new', sidebar: false, role: 'user:create' },
        { url: '/app/device/new', sidebar: false, role: 'device:create' },
        { url: '/app/project/new', sidebar: false, role: 'project:create' },
      ];
      const url = '/app/building/new';
      const expected = '';

      expect(access.getRole(url)).to.equal(expected);
    });
  });
});
