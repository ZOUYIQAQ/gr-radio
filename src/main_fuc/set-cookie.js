const { session } = require('electron');
// 临时方案
// 检查Set-Cookie头部是否缺少SameSite=None属性并进行补充
session.defaultSession.webRequest.onHeadersReceived(
    { urls: ['https://gensokyoradio.net/login/loginProcess.php'] },
    (details, callback) => {
        if (
            details.responseHeaders &&
            details.responseHeaders['Set-Cookie'] &&
            details.responseHeaders['Set-Cookie'].length &&
            !details.responseHeaders['Set-Cookie'][0].includes('SameSite=none')
        ) {
            details.responseHeaders['Set-Cookie'][0] = details.responseHeaders['Set-Cookie'][0] + '; SameSite=none; Secure';
        }
        if (
            details.responseHeaders &&
            details.responseHeaders['set-cookie'] &&
            details.responseHeaders['set-cookie'].length &&
            !details.responseHeaders['set-cookie'][0].includes('SameSite=none')
        ) {
            details.responseHeaders['set-cookie'][0] = details.responseHeaders['set-cookie'][0] + '; SameSite=none; Secure';
        }
        console.log('Set-Cookie', details.responseHeaders['Set-Cookie'])
        console.log('set-cookie', details.responseHeaders['set-cookie'])
        callback({ cancel: false, responseHeaders: details.responseHeaders });
    },
)