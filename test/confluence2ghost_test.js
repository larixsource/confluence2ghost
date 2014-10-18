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

  it('must be áéíóú', function () {
    assert.equal(confluence2ghost.convert('&aacute;&eacute;&iacute;&oacute;&uacute;'), 'áéíóú');
  });

  it('must be niña', function () {
    assert.equal(confluence2ghost.convert('ni&ntilde;a'), 'niña');
  });

  it('must be "well done"', function () {
    assert.equal(confluence2ghost.convert('well&nbsp;done'), 'well done');
  });

  it('must be ¿Uno o dos?', function () {
    assert.equal(confluence2ghost.convert('&iquest;Uno o dos?'), '¿Uno o dos?');
  });

  it('must be ¡Listo!', function () {
    assert.equal(confluence2ghost.convert('&iexcl;Listo!'), '¡Listo!');
  });
});
