const { session } = require('electron');
// 检查set-cookie头部是否缺少SameSite=None属性并进行补充
session.defaultSession.webRequest.onHeadersReceived(
    { urls: ['https://gensokyoradio.net/login/loginProcess.php'] },
    (details, callback) => {
        if (
            details.responseHeaders &&
            details.responseHeaders['set-cookie'] &&
            details.responseHeaders['set-cookie'].length &&
            !details.responseHeaders['set-cookie'][0].includes('SameSite=none')
        ) {
            details.responseHeaders['set-cookie'][0] = details.responseHeaders['set-cookie'][0] + '; SameSite=none; Secure';
        }
        console.log(details.responseHeaders['set-cookie'])
        callback({ cancel: false, responseHeaders: details.responseHeaders });
    },
)