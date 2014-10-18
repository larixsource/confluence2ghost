/*
 * Confluence to Ghost
 * https://github.com/larixsource/confluence2ghost
 *
 * Copyright (c) 2014 Larix Ltda.
 * Licensed under the Apache-2.0 license.
 */

'use strict';

var fs = require('fs');
var toMarkdown = require('to-markdown').toMarkdown;

function unescapeSpanishCharacters(markdown) {
  return markdown
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&iquest;/g, '¿')
    .replace(/&iexcl;/g, '¡');
}

exports.convertFile = function (filePath) {
  var confluenceXHTML = fs.readFileSync(filePath);
  return exports.convert(confluenceXHTML);
};

exports.convert = function (confluenceXHTML) {
  var escapedMarkdown = toMarkdown(confluenceXHTML.toString());
  return unescapeSpanishCharacters(escapedMarkdown);
};
