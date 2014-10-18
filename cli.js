#! /usr/bin/env node

'use strict';

// FIXME: npm link doesn't work well with ./confluence2ghost
//var confluence2ghost = require('./confluence2ghost');
var confluence2ghost = require('../confluence2ghost');

var userArgs = process.argv;
var fileParam = userArgs[2];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || fileParam === undefined) {
  return console.log('cli help');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(require('./package').version);
}

if (fileParam) {
  return console.log(confluence2ghost.convertFile(fileParam));
}