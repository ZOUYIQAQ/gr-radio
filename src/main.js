const { app, BrowserWindow, ipcMain, } = require('electron');
const path = require('path');
// 本地储存数据
const Store = require('electron-store');
Store.initRenderer();
let windows = {
  mainWindow: null, //主窗口
}
function createWindow() {
  windows.mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      // 预加载脚本
      preload: path.join(__dirname, './preload.js'),
      // 关闭上下文隔离
      // contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,//禁用同源策略
    },
  });

  windows.mainWindow.loadURL('http://localhost:3000'); // React应用的URL
  windows.mainWindow.on('closed', () => {
    windows.mainWindow = null
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
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
// 接受信息管理窗口状态
ipcMain.on('windowManage', (event, windowName, fuc) => {
  console.log(event, windowName, fuc)
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