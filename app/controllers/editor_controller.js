
var locomotive = require('locomotive') , nowjs = require('now');

var Controller = locomotive.Controller;

var EditorController = new Controller();


 function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}


EditorController.generate = function() {
    var name = randomString();
    this.redirect('/editor/'+name);
};

EditorController.main = function() {

    
    var sessionName = this.session_name = this.params('slug');

    this.cdn_path = this.req.app.settings.cdn_path;
    var session  = nowjs.getGroup(sessionName);

    this.render();
};

module.exports = EditorController;
