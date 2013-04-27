var express = require('express');

module.exports = function() {
  this.set('views', __dirname + '/../../app/views');
  if (process.env.NODE_ENV != '') {
  	this.set('env', process.env.NODE_ENV);
  }
  this.set('view engine', 'ejs');
  this.use(express.logger());
  this.use(express.bodyParser());
  this.use(this.router);
  this.use(express.static(__dirname + '/../../public'));
}
