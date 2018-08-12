const assert = require('assert');
const app = require('../../src/app');

describe('\'story\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/story');

    assert.ok(service, 'Registered the service');
  });
});
