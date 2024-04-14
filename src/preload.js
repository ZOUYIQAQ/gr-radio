const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('electron', {
    // 管理窗口状态
    windowManage: (windowName, fuc)=>{
        ipcRenderer.send('windowManage', windowName, fuc)
    },
    // 获取窗口是否最大化
    isMaximized: (windowName)=>{
        return ipcRenderer.sendSync('isMaximized', windowName)
    }
})