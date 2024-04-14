import "./header.css"
const windowManage = window.electron.windowManage
const isMaximized = window.electron.isMaximized
// 最小化窗口
function MinWin() {
    windowManage('mainWindow', 'min')
}
// 最大化窗口
function MaxWin() {
    const win_ico = document.querySelector('#max > img')
    if (isMaximized('mainWindow')){
        win_ico.src = 'img/icons8-最大化按钮-48.png'
    }else{
        win_ico.src = 'img/icons8-restore-down-48.png'
    }
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
                    <img src="/img/icons8-最大化按钮-48.png" alt=""></img>
                </div>
                <div className="ico" id="close" onClick={CloseWin}>
                    <img src="/img/icons8-叉-50.png" alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Headers