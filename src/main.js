const { app, BrowserWindow, ipcMain, } = require('electron');
const path = require('path');
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
    windows.mainWindow
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
        if (windows[windowName].isMaximized()){
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