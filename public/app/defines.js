var windowSize = {
    height: 0,
    width: 0,
    headersHeight: 0,
    mainHeight: 0,
    contentBodyHeight: 0,
    contentBodyWidth: 0,
    leftNavHeight: 0,
    contentDetailsWidth: 0,
    participantsHeight:0,
    chatwindowHeight:0,
    codemirrorHeight:0,
    setDimensions: function(){
        windowSize.height = $(window).height()-100;
        windowSize.width = $('body').width();
        windowSize.headersHeight = $('#header').height();
        windowSize.mainHeight = windowSize.height - windowSize.headersHeight;
        windowSize.contentBodyHeight = windowSize.mainHeight - ($('.contentHead').height() + $('.contentFoot').height());
        windowSize.contentBodyWidth = $('.contentBody').width();
        windowSize.leftNavHeight = windowSize.mainHeight-30;
        windowSize.participantsHeight = $("#participants").height();
        windowSize.chatwindowHeight = windowSize.leftNavHeight-windowSize.participantsHeight-80;
        windowSize.codemirrorHeight = windowSize.contentBodyHeight-55;
        windowSize.problemwindowHeight = windowSize.leftNavHeight-230-80;
        windowSize.updateSizes();
    },
    updateSizes: function(){
        $('#main').css('height',windowSize.mainHeight+'px');
        $('.contentBody').css('height',(windowSize.contentBodyHeight)+'px');
        $('.CodeMirror-scroll').css('height',(windowSize.codemirrorHeight)+'px');
        $('.leftNav').css('height',windowSize.leftNavHeight+'px');
        $("#chat").css('height', windowSize.chatwindowHeight+'px');
        $("#lequestions textarea").css('height', windowSize.problemwindowHeight+'px');
    },
    init: function() {
        if ($('#main').length) {
            windowSize.setDimensions();
        }
    }
};
