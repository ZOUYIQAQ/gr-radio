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
    appInitialized: (callback)=>{
        ipcRenderer.on('appInitialized', (event)=>{
            callback()
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
})