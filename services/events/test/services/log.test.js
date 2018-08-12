const assert = require('assert');
const app = require('../../src/app');

describe('log service', () => {
  it('registered the service', () => {
    const service = app.service('/api/log');

    assert.ok(service, 'Registered the service');
  });
});
