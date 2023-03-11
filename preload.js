const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    updateMessage: (callback) => ipcRenderer.on("update-message", callback),
});