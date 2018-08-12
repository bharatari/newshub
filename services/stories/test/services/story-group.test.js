const assert = require('assert');
const app = require('../../src/app');

describe('\' storyGroup\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/story-group');

    assert.ok(service, 'Registered the service');
  });
});
