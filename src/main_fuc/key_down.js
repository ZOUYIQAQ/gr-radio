let { windows, } = require('../main.js')
const { globalShortcut } = require('electron');
const Store = require('electron-store');
const store = new Store();
// 获得窗口焦点
windows.mainWindow.on('focus', () => {
    // 暂停或播放音乐
    globalShortcut.register('Space', () => {
        const is_playing = store.get('is_playing')
        if ( is_playing === 'play' ) windows.mainWindow.webContents.send('change_play_status', 'stop')
        else windows.mainWindow.webContents.send('change_play_status', 'play')
    });
});
// 失去窗口焦点
windows.mainWindow.on('blur', () => {
    // 注销全局快捷键
    globalShortcut.unregister('Space');
});