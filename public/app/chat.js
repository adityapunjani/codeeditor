var flag = 0;

now.lestart = function() {
  if(flag == 0) {
    flag = 1;
    defaultval = 'User' + " " + parseInt(Math.random() * 10000);
    now.userName = window.prompt("Enter Username", defaultval);
    if(now.userName != null) {
      $('#participants ul').append("<li>" + now.userName + "</li>");
      now.sendStatus(now.userName, "is online.");
    } else {
      $('#participants ul').append("<li>" + defaultval + "</li>");
      now.sendStatus(defaultval, "is online.");
    }

  } else document.location.reload(true);
};


$(window).load(function() {
  windowSize.init();
});

$(window).resize(function() {
  windowSize.setDimensions();
});

$(document).ready(function() {
  var sendchat = function() {
      now.distributemessage(now.userName, $("#chatbox textarea").val());
      $("#chatbox textarea").val("");
    };

  now.receiveChat = function(username, message) {
    $("#chat").append(" <div class=\"chat-message\">" + "<b>" + username + "</b>" + ":" + " " + message + "</div>");

    $("#chat").scrollTop($("#chat").height());
  };

  now.getStatus = function(username, message) {
    $("#chat").append(" <div class=\"chat-message\" style=\"color:green\">" + "<i>" + username + " " + message + "</i>" + "<br />" + "</div>");
    $(this).attr('id', username);
    $("#chat").scrollTop($("#chat").height());
  };

  now.gotDC = function(username, message) {
    $("#chat").append(" <div class=\"chat-message\" style=\"color:red\">" + "<i>" + username + " " + message + "</i>" + "<br />" + "</div>");
    $("#chat").scrollTop($("#chat").height());
  };

  $("#chatbox textarea").keydown(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      sendchat();
    }
  });

  now.gettyping = function(username) {
    $("#StatusBar").empty().append(username + " " + "is typing code...");
  };

  now.getdone = function(username) {
    $("#StatusBar").empty().html("");
  };

  setInterval(function() {
    now.senddone(now.userName);
  }, 4000);
});