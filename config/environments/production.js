var express = require('express');

module.exports = function() {
  this.set('view options', { layout: false }); 
  this.set('cdn_path', 'http://ubuntu@ec2-23-22-30-72.compute-1.amazonaws.com/');
  this.use(express.errorHandler());
}