const assert = require('assert');
const app = require('../../src/app');

describe('\'action\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/action');

    assert.ok(service, 'Registered the service');
  });
});
