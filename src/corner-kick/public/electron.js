const electron = require('electron');
const exec = require('child_process').exec;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let rosBridge;

function start() {
  rosBridge = exec('roslaunch rosbridge_server rosbridge_websocket.launch');

  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', start);

app.on('window-all-closed', () => {
  if(rosBridge !== undefined) {
    rosBridge.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});