const assert = require('assert');
const app = require('../../src/app');

describe('\'tag\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/tag');

    assert.ok(service, 'Registered the service');
  });
});
