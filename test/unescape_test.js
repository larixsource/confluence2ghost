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

  it('must be ÁÉÍÓÚ', function () {
    assert.equal(confluence2ghost.convert('&Aacute;&Eacute;&Iacute;&Oacute;&Uacute;'), 'ÁÉÍÓÚ');
  });

  it('must be NIÑA', function () {
    assert.equal(confluence2ghost.convert('NI&Ntilde;A'), 'NIÑA');
  });

  it('must be "well done"', function () {
    assert.equal(confluence2ghost.convert('well&nbsp;done'), 'well\u00A0done');
  });

  it('must be ¿Uno o dos?', function () {
    assert.equal(confluence2ghost.convert('&iquest;Uno o dos?'), '¿Uno o dos?');
  });

  it('must be ¡Listo!', function () {
    assert.equal(confluence2ghost.convert('&iexcl;Listo!'), '¡Listo!');
  });

  it('must be pingüino', function () {
    assert.equal(confluence2ghost.convert('ping&uuml;ino'), 'pingüino');
  });

  it('must be 1ª', function () {
    assert.equal(confluence2ghost.convert('1&ordf;'), '1ª');
  });

  it('must be 2º', function () {
    assert.equal(confluence2ghost.convert('2&ordm;'), '2º');
  });
});
