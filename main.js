const {app, BrowserWindow,} = require('electron');
const {autoUpdater, AppUpdater} = require("electron-updater");
const path = require('path');

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let win = null

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools()
};

const showMessage = (win, value) => {
    win&&win.webContents.send("update-message", value)
}

app.enableSandbox()

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    showMessage(win, 'check-update')
});

autoUpdater.checkForUpdates();

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
    showMessage(win, `Update available. Current version ${app.getVersion()}`)
    let pth = autoUpdater.downloadUpdate();
    showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
    showMessage(win, `No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
    showMessage(win, `Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
    showMessage(win, info);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});