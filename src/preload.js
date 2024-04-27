const {contextBridge, ipcRenderer, } = require('electron');
const Store = require('electron-store')
const store = new Store()
contextBridge.exposeInMainWorld('electron', {
    // 管理窗口状态
    windowManage: (windowName, fuc)=>{
        ipcRenderer.send('windowManage', windowName, fuc)
    },
    // 获取窗口是否最大化
    isMaximized: (windowName)=>{
        return ipcRenderer.sendSync('isMaximized', windowName)
    },
    // 应用加载完成后执行回调函数
    appInitialized: (callback, ...args)=>{
        ipcRenderer.on('appInitialized', (event)=>{
            callback(...args)
        })
    },
    // 保存数据到本地
    saveData: (key, value)=>{
        store.set(key, value)
    },
    // 读取本地数据
    getData: (key, defaultValue=null)=>{
        return store.get(key, defaultValue)
    },
    // 音乐数据改变
    changeMusicData: ()=>{
        ipcRenderer.send('change_music')
    },
    // 音乐数据改变回调函数
    onChangeMusicData: (callback)=>{
        ipcRenderer.on('change_music', ()=>{
            callback()
        })
    },
    // 音乐播放状态改变
    changeMusicPlayStatus: (mode)=>{
        ipcRenderer.send('change_play_status', mode)
    },
    // 音乐播放状态改变回调函数
    onChangeMusicPlayStatus: (callback, fuc=null)=>{
        ipcRenderer.on('change_play_status', (event, mode)=>{
            // 暂停和播放时需要处理音量的特殊情况
            if (fuc) callback(fuc())
            else callback(mode)
        })
    },
    // 音乐声音大小改变
    changeMusicVolume: (volume)=>{
        ipcRenderer.send('change_volume', volume)
    },
    // 音乐声音大小改变回调函数
    onChangeMusicVolume: (callback)=>{
        ipcRenderer.on('change_volume', (event, volume)=>{
            callback(volume)
        })
    },
})