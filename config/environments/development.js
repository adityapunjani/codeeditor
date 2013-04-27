var express = require('express'),
    nowjs = require('now'),
    fs = require('fs');

module.exports = function() {
  this.set('view options', { layout: false });
  this.set('cdn_path', 'http://127.0.0.1:3000/');
  this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
};