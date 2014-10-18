/**
 * Unit tests
 */

'use strict';

var assert = require('assert'),
  confluence2ghost = require('../lib/confluence2ghost.js');

describe('confluence2ghost node module.', function () {
  it('must be # Ajá', function () {
    assert.equal(confluence2ghost.convert('<h1>Aj&aacute;</h1>'), '# Ajá');
  });
});
