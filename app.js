var locomotive = require('locomotive');
var express = require('express'),
  sharejs = require('share'),
  nowjs = require('now');
var connect = require('connect');
var app = express();
app.set('view options', {
  layout: false
})
var options = {
  db: {
    type: 'none'
  }
};
locomotive.boot('.', 'development', function(err, app) {
  //locomotive.boot('.', 'production', function(err, app) {
  if(err) {
    throw err;
  }

  console.log(app.settings);

  GLOBAL.everyone = nowjs.initialize(app);
  sharejs.server.attach(app, options);
  app.listen(3000, '127.0.0.1', function() {
    //app.listen(80, '10.119.97.244', function() {
    var addr = this.address();
    console.log('listening on %s:%d', addr.address, addr.port);
  });
});


nowjs.on('connect', function() {
  this.now.lestart();
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  session.hasClient(user.clientId, function(flag) {
    if(flag == false) {
      session.addUser(user.clientId);
      console.error(user.clientId + " connected to the group " + sessionName);
      //GLOBAL.everyone.now.distributeMessage(userName, {'action': 'userJoin', userName: 'Guest' + parseInt(Math.random()*1000)});
    }
  });

  this.now.startcode(sessionName);
  session.getUsers(function(users) {
    var uName = [];
    var x = users.length;
    console.error(x);
    for(var i = 0; i < users.length; i++) {
      nowjs.getClient(users[i], function() {
        uName[i] = this.now.userName;
        //console.error(uName); 
      });
    }
    for(var i = 0; i < users.length; i++) {
      nowjs.getClient(users[x - 1], function() {
        if(uName[i] != null) {
          this.now.getStatus(uName[i], "is online");
        }
      });
    }
  });

});

nowjs.on('disconnect', function() {
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  console.error(user.clientId + " disconnected " + sessionName);
  session.removeUser(user.clientId);
  if(userName != null) {
    session.now.gotDC(userName, "is offline.");
  }
});



GLOBAL.everyone.now.distributemessage = function(userName, message) {
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  session.exclude(user.clientId).now.receiveChat(userName, message);
  this.now.receiveChat("You", message);
};
GLOBAL.everyone.now.sendStatus = function(userName, message) {
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  if(userName != null) {
    session.exclude(user.clientId).now.getStatus(userName, message);
    this.now.getStatus("You", "are now online.")
  }
};

GLOBAL.everyone.now.sendtyping = function(userName) {
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  session.exclude(user.clientId).now.gettyping(userName);
};
GLOBAL.everyone.now.senddone = function(userName) {
  var sessionName = this.now.sessionName;
  var userName = this.now.userName;
  var session = nowjs.getGroup(sessionName);
  var user = this.user;
  session.exclude(user.clientId).now.getdone(userName);
};