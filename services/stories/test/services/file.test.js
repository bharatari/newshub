const assert = require('assert');
const app = require('../../src/app');

describe('\'file\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/file');

    assert.ok(service, 'Registered the service');
  });
});
