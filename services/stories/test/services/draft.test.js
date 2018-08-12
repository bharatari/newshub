const assert = require('assert');
const app = require('../../src/app');

describe('\'draft\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/draft');

    assert.ok(service, 'Registered the service');
  });
});
