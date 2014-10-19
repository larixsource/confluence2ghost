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
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

function asDom(confluenceXHTML) {
  var validXml = '<div>' + confluenceXHTML + '</div>';
  return new DOMParser().parseFromString(validXml, 'text/html');
}

function asConfluenceXHTML(dom) {
  var xmlSerializer = new XMLSerializer();
  var withDivs = xmlSerializer.serializeToString(dom);
  return withDivs.substring('<div>'.length, withDivs.length - '</div>'.length);
}

function replaceImages(dom) {
  var images = dom.getElementsByTagName('ac:image');
  if (images.length > 0) {
    var image = images[0];
    var parent = image.parentNode;
    var marker = dom.createTextNode('![]()');
    parent.replaceChild(marker, image);
  }
  return dom;
}

function unescapeSpanishCharacters(markdown) {
  return markdown
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&iquest;/g, '¿')
    .replace(/&iexcl;/g, '¡')
    .replace(/&uuml;/g, 'ü')
    .replace(/&ordf;/g, 'ª')
    .replace(/&ordm;/g, 'º');
}

exports.convertFile = function (filePath) {
  var confluenceXHTML = fs.readFileSync(filePath);
  return exports.convert(confluenceXHTML.toString());
};

exports.convert = function (confluenceXHTML) {
  var unescapeMarkdown = unescapeSpanishCharacters(confluenceXHTML);
  var dom = asDom(unescapeMarkdown);
  replaceImages(dom);
  var xhtml = asConfluenceXHTML(dom);
  return toMarkdown(xhtml);
};
