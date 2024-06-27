const init_albu_database = require('./content/album/album_database.js')
const { contextBridge, ipcRenderer, shell } = require('electron')
const Store = require('electron-store')
const store = new Store()
let album_database
init_albu_database().then(res => album_database = res)
contextBridge.exposeInMainWorld('electron', {
    // 管理窗口状态
    windowManage: (windowName, fuc) => {
        ipcRenderer.send('windowManage', windowName, fuc)
    },
    // 获取窗口是否最大化
    isMaximized: (windowName) => {
        return ipcRenderer.sendSync('isMaximized', windowName)
    },
    // 应用加载完成后执行回调函数
    appInitialized: (callback, ...args) => {
        ipcRenderer.on('appInitialized', (event) => {
            callback(...args)
        })
    },
    // 保存数据到本地
    saveData: (key, value) => {
        store.set(key, value)
    },
    // 读取本地数据
    getData: (key, defaultValue = null) => {
        return store.get(key, defaultValue)
    },
    // 音乐数据改变
    changeMusicData: () => {
        ipcRenderer.send('change_music')
    },
    // 音乐数据改变回调函数
    onChangeMusicData: (callback) => {
        ipcRenderer.on('change_music', () => {
            callback()
        })
    },
    // 音乐播放状态改变
    changeMusicPlayStatus: (mode) => {
        ipcRenderer.send('change_play_status', mode)
    },
    // 音乐播放状态改变回调函数
    onChangeMusicPlayStatus: (callback, fuc = null) => {
        ipcRenderer.on('change_play_status', (event, mode) => {
            // 暂停和播放时需要处理音量的特殊情况
            if (fuc) callback(fuc())
            else callback(mode)
        })
    },
    // 音乐声音大小改变
    changeMusicVolume: (volume) => {
        ipcRenderer.send('change_volume', volume)
    },
    // 音乐声音大小改变回调函数
    onChangeMusicVolume: (callback) => {
        ipcRenderer.on('change_volume', (event, volume) => {
            callback(volume)
        })
    },
    // 在默认浏览器中打开链接
    openLink: (link) => {
        shell.openExternal(link)
    },
    // 收藏数据改变
    changeCollecteData: () => {
        ipcRenderer.send('change_collect')
    },
    // 收藏数据改变回调函数
    onChangeCollecteData: (callback) => {
        ipcRenderer.on('change_collect', () => {
            callback()
        })
    },
    // 专辑数据 - 增
    albumDatabaseAdd: async (album_id, album_data) => {
        await album_database.add(album_id, album_data)
    },
    // 专辑数据 - 删
    albumDatabaseDelete: async (album_id) => {
        await album_database.delete(album_id)
    },
    // 专辑数据 - 改
    albumDatabaseUpdate: async (album_id, album_data) => {
        await album_database.update(album_id, album_data)
    },
    // 专辑数据 - 查
    albumDatabaseGet: async (album_id) => {
        if (!album_database?.get) await new Promise(resolve => setTimeout(resolve, 100))
        return await album_database.get(album_id)

    },
    // 更新音乐专辑id
    updateMusicAlbumId: (album_id) => {
        ipcRenderer.send('update_music_album_id', album_id)
    },
    // 响应更新音乐专辑id
    onUpdateMusicAlbumId: (callback) => {
        ipcRenderer.on('update_music_album_id', (event, album_id) => {
            callback(album_id)
        })
    },
    // 更新新闻数据
    updataNewsData: () => {
        ipcRenderer.send('updata_news_data')
    },
    // 响应新闻数据更新
    onUpdataNewsData: (callback) => {
        ipcRenderer.on('updata_news_data', () => {
            callback()
        })
    },
    // 更新评论数据
    updataReviewData: () => {
        ipcRenderer.send('updata_review_data')
    },
    // 响应评论数据更新
    onUpdataReviewData: (callback) => {
        ipcRenderer.on('updata_review_data', () => {
            callback()
        })
    },
    // 获取应用版本号
    getNowVersion: () => {
        return require('../package.json').version
    }
})