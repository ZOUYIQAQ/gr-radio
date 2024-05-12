let { windows, } = require('../main.js')
const { ipcMain, } = require('electron');
// 接受信息管理窗口状态
ipcMain.on('windowManage', (event, windowName, fuc) => {
    console.log(fuc)
    if (!(windowName in windows)) return
    switch (fuc) {
        case 'min':
            windows[windowName].minimize()
            break
        case 'max':
            if (windows[windowName].isMaximized()) {
                windows[windowName].unmaximize()
                break
            }
            windows[windowName].maximize()
            break
        case 'close':
            windows[windowName].close()
            break
        default:
            console.log('命令错误')
            break
    }
})
// 获取窗口是否最大化
ipcMain.on('isMaximized', (event, windowName) => {
    event.returnValue = windows[windowName].isMaximized()
})
// 监听应用加载完成并发送消息
windows.mainWindow.webContents.on('ready-to-show', () => {
    windows.mainWindow.webContents.send('appInitialized')
})
// 监听并响应音乐数据改变
ipcMain.on('change_music', () => {
    windows.mainWindow.webContents.send('change_music')
})
// 监听并响应音乐播放状态改变
ipcMain.on('change_play_status', (event, mode) => {
    windows.mainWindow.webContents.send('change_play_status', mode)
})
// 监听并响应音乐声音大小改变
ipcMain.on('change_volume', (event, volume) => {
    windows.mainWindow.webContents.send('change_volume', volume)
})