const assert = require('assert');
const app = require('../../src/app');

describe('\'cycle\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/cycle');

    assert.ok(service, 'Registered the service');
  });
});
