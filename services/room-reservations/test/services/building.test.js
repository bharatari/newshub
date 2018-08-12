const assert = require('assert');
const app = require('../../src/app');

describe('\'building\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/building');

    assert.ok(service, 'Registered the service');
  });
});
