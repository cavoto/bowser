var ipc = require("electron").ipcRenderer;
 // Or in the renderer process.
    const BrowserWindow = require('electron').remote.BrowserWindow;

ipc.on('stop', function () {
    callPlayer('whateverID', 'pauseVideo');
});

ipc.on('play', function () {
    callPlayer('whateverID', 'playVideo');
});

ipc.on('openYoutube', function () {
   
    var win = new BrowserWindow({ width: 800, height: 400, show: false });
    win.on('closed', function () {
        win = null;
    });

    win.loadURL('file://' + __dirname + '/openYoutube.html');
    win.show();
});

function getYoutubeID(url) {
    var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

    var videoID = url.match(myregexp);

    return videoID;
}

function playYoutube(id) {
    // var ID = getYoutubeID('https://www.youtube.com/watch?v=CUr2Xzqxss8&ebc=ANyPxKrmSk4xLeI9DwceEgG15WJjXwemeKRshpnz2kqCQ0iH7_0sI9JkxBEVSS6kU2ta5tbyiTJQNh6KRYNn-m6FCXrVMPwSIQ');
    // // console.log(ID);
    var iframe = document.getElementById('playerFrame');
    iframe.src = 'http://www.youtube.com/embed/' + id + '?enablejsapi=1';

    iframe.onload = function () {
        callPlayer('whateverID', 'playVideo');
        iframe.onload = null;
    };
}

function validate() {
    var url =  document.getElementById('url');
    var ID = getYoutubeID(url.value);
    if(ID !== null) {
        playYoutube(ID[1]);
    }
    console.log(ID);
}