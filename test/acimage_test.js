/**
 * Unit tests for <ac:image> replacement
 */

'use strict';

var assert = require('assert'),
  confluence2ghost = require('../lib/confluence2ghost.js');

describe('confluence2ghost node module.', function () {
  it('must be # Profile\n![]()', function () {
    var xhtml = '<h1>Profile</h1>\n' +
      '<p><ac:image><ri:attachment ri:filename="photo.png" /></ac:image></p>';
    var markdown = '# Profile\n\n' +
      '![]()';
    assert.equal(confluence2ghost.convert(xhtml), markdown);
  });
});
