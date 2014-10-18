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
    .replace('&aacute;', 'á')
    .replace('&eacute;', 'é')
    .replace('&iacute;', 'í')
    .replace('&oacute;', 'ó')
    .replace('&uacue;', 'ú');
}

exports.convertFile = function (filePath) {
  var confluenceXHTML = fs.readFileSync(filePath);
  return exports.convert(confluenceXHTML);
};

exports.convert = function (confluenceXHTML) {
  var escapedMarkdown = toMarkdown(confluenceXHTML.toString());
  return unescapeSpanishCharacters(escapedMarkdown);
};
