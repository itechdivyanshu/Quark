const electron = require('electron');
const app = electron.app;
const path = require('path');
const url = require('url');
const nativeImage = electron.nativeImage;

let demoIcon =nativeImage.createFromPath(path.join(__dirname, 'icon.png'))

const BrowserWindow = electron.BrowserWindow;
var mainWindow;
function createWindow(){
	mainWindow = new BrowserWindow({width: 800, height: 800,/*backgroundColor: '#141414',*/transparent:true,minHeight: 800,minWidth: 800,icon:demoIcon,frame: false,webPreferences: {nodeIntegration: true}});
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'quark.html'),
		protocol: 'file:',
		slashes: true
    }));
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed',() => {
        mainWindow = null;
    });
};
var settingWindow = null;
exports.openwindowS = (filenameofthi)=>{
    if(settingWindow === null){
    settingWindow = new BrowserWindow({width: 800, height: 500,backgroundColor: '#141414',transparent:false,minHeight: 500,minWidth: 800,maxHeight: 500,maxWidth: 800,icon:demoIcon,frame: false,webPreferences: {nodeIntegration: true}});
	settingWindow.setMenuBarVisibility(false);
	settingWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'setting.html'+filenameofthi),
		protocol: 'file:',
		slashes: true
    }));
    settingWindow.webContents.openDevTools();
    settingWindow.on('closed',() => {
        settingWindow = null;
    });
}
}
app.on('ready',createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
});
app.on('activate', () => {
    if(mainWindow === null){
        createWindow()
    }
});

const {ipcMain} = require('electron')
ipcMain.on('resize-me-please', (event, arg) => {
  mainWindow.setSize(800,800);
  mainWindow.center();
})