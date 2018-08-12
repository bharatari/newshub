const assert = require('assert');
const app = require('../../src/app');

describe('\'room\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/room');

    assert.ok(service, 'Registered the service');
  });
});
