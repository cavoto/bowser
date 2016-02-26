'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

var ipc = require("electron").ipcMain;
var path = require('path');
var appIcon = null;
var icon = path.join(__dirname, 'images', '2.png');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {


    appIcon = new Tray(icon);

  
    // Create the browser window.640x360
    mainWindow = new BrowserWindow({ width: 640, height: 360, frame: false, 'always-on-top': true, icon: icon});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //   mainWindow.loadURL('https://www.youtube.com/watch?v=rGNK6ohmMrc');
  
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    
    
        var contextMenu = Menu.buildFromTemplate([
        { label: 'Pause', type: 'normal', click: function () {
            mainWindow.webContents.send('stop');
        }},
        { label: 'Play', type: 'normal', click: function () {
            mainWindow.webContents.send('play');
        }},
        { label: '', type: 'separator'},
        { label: 'Open Youtube', type: 'normal', click: function () {
            mainWindow.webContents.send('openYoutube');
        }}
    ]);
    appIcon.setToolTip('This is my application.');
    appIcon.setContextMenu(contextMenu);
  


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
