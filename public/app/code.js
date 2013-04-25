
 $(window).load(function () {


now.editor = CodeMirror.fromTextArea($("#codeeditor").get(0), {
        mode: "text/x-c++src",
        lineNumbers: true,
        lineWrapping: true,
        onCursorActivity: function() {
            now.editor.setLineClass(hlLine, null);
            hlLine = now.editor.setLineClass(now.editor.getCursor().line, "activeline");
        },
        onKeyEvent:function(editor, event) {
              if (event.type === 'keydown') {
                now.sendtyping(now.userName);}}
    });
    var hlLine = now.editor.setLineClass(0, "activeline");
    now.startcode = function(name){
    sharejs.open(name, 'text', function(error, doc) {
        doc.attach_codemirror(now.editor);
     });
    };
 $("#cpp").click(function() {
  now.editor.setOption("mode", "text/x-c++src");
  $("#lang").empty().append("C++");
  });
 $("#ruby").click(function() {
  now.editor.setOption("mode", "text/x-ruby");
  $("#lang").empty().append("Ruby");
  }); 
 $("#python").click(function() {
  now.editor.setOption("mode", "text/x-python");
  $("#lang").empty().append("Python");
  });
 $("#php").click(function() {
  now.editor.setOption("mode", "application/x-httpd-php")
  $("#lang").empty().append("PHP");
  });
 })