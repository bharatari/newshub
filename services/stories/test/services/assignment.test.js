const assert = require('assert');
const app = require('../../src/app');

describe('\'assignment\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/assignment');

    assert.ok(service, 'Registered the service');
  });
});
