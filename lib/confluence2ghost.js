/*
 * Confluence to Ghost
 * https://github.com/larixsource/confluence2ghost
 *
 * Copyright (c) 2014 Larix Ltda.
 * Licensed under the Apache-2.0 license.
 */

'use strict';

var fs = require('fs');
var he = require('he');
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

function replaceCodeBlock(dom, element) {
  var parent = element.parentNode;
  var contentElements = element.getElementsByTagName('ac:plain-text-body');
  if (contentElements.length > 0) {
    var pre = dom.createElement('pre');
    var code = dom.createElement('code');
    var codeText = dom.createTextNode(contentElements[0].firstChild.data);
    pre.appendChild(code);
    code.appendChild(codeText);
    parent.replaceChild(pre, element);
  } else {
    console.error('No ac:plain-text-body element found');
  }
  return dom;
}

function replaceStructuredMacro(dom) {
  var macros = dom.getElementsByTagName('ac:structured-macro');
  while (macros.length > 0) {
    var macro = macros[0];
    var macroName = macro.getAttribute('ac:name');
    if (macroName === 'code') {
      replaceCodeBlock(dom, macro);
    } else {
      console.warn('replacement of macro %s not supported', macroName);
    }
    // FIXME: ugh, find a nicer way to do this
    macros = dom.getElementsByTagName('ac:structured-macro');
  }
}

exports.convertFile = function (filePath) {
  var confluenceXHTML = fs.readFileSync(filePath);
  return exports.convert(confluenceXHTML.toString());
};

exports.convert = function (confluenceXHTML) {
  var unescapeMarkdown = he.unescape(confluenceXHTML);
  var dom = asDom(unescapeMarkdown);
  replaceImages(dom);
  replaceStructuredMacro(dom);
  var xhtml = asConfluenceXHTML(dom);
  return toMarkdown(xhtml);
};
