'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('image service', function() {
  it('registered the image service', () => {
    assert.ok(app.service('/api/image'));
  });
});
