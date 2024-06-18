const { session } = require('electron');
const Store = require('electron-store');
const store = new Store();
let pid_value = ''
// 在发出请求前添加自定义Cookie
session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['https://gensokyoradio.net/logout/',
        'https://gensokyoradio.net/account/favorites/',
        'https://gensokyoradio.net/js/*',
    ] },
    (details, callback) => {
        const key = 'gr_autologin'
        const value = store.get(key, '')
        const pid_key = 'PHPSESSID'
        details.requestHeaders['Cookie'] = (details.requestHeaders['Cookie'] || '') + `; ${key}=${value}; ` + `${pid_key}=${pid_value}; `
        callback({ requestHeaders: details.requestHeaders })
    }
)
// 获取pid_value
session.defaultSession.webRequest.onHeadersReceived(
    { urls: ['https://gensokyoradio.net/account/favorites/'] },
    (details, callback) => {
        if (details.responseHeaders['Set-Cookie'] && details.responseHeaders['Set-Cookie'].length > 0) pid_value = details.responseHeaders['Set-Cookie'][0].match(/PHPSESSID=(\w+)/)[1]
        if (details.responseHeaders['set-cookie'] && details.responseHeaders['set-cookie'].length > 0) pid_value = details.responseHeaders['set-cookie'][0].match(/PHPSESSID=(\w+)/)[1]
        console.log('pid_value', pid_value)
        callback({ cancel: false, responseHeaders: details.responseHeaders });
    },
)