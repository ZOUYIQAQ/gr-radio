import "./header.css"
const windowManage = window.electron.windowManage
// 最小化窗口
function MinWin() {
    windowManage('mainWindow', 'min')
}
// 最大化窗口
function MaxWin() {
    windowManage('mainWindow', 'max')
}
// 关闭窗口
function CloseWin() {
    windowManage('mainWindow', 'close')
}

function Headers() {
    return(
        <div id="headers">
            <div id="header-left">
                <div style={{width: '10px'}}></div>
                <img src="/img/app_logo.png" alt="" id="app_logo"></img>
            </div>
            <div id="header-right">
                <div className="ico" id="min" onClick={MinWin}>
                    <img src="/img/icons8-最小化-50.png" alt=""></img>
                </div>
                <div className="ico" id="max" onClick={MaxWin}>
                    <img src="/img/icons8-矩形一笔画-24.png" alt=""></img>
                </div>
                <div className="ico" id="close" onClick={CloseWin}>
                    <img src="/img/icons8-叉-50.png" alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Headers