const { app, BrowserWindow, } = require('electron');
const path = require('path');
// 本地储存数据
const Store = require('electron-store');
Store.initRenderer();
const store = new Store();
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
      enableRemoteModule: true,
      webSecurity: false,//禁用同源策略
    },
  });

  windows.mainWindow.loadURL('http://localhost:3000'); // React应用的URL
  windows.mainWindow.on('closed', () => {
    windows.mainWindow = null
  })
  // 处理通信相关事宜
  require('./main_fuc/main_ipc')
  // 处理键盘事件相关事宜
  require('./main_fuc/key_down')
}

app.whenReady().then(() => {
  createWindow()
  // 处理跨域请求cookie
  require('./main_fuc/set-cookie')
});
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
app.on('ready', () => {
  store.set('is_playing', false)
})


module.exports = { windows, }