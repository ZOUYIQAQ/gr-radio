import "./header.css"
import big_window_png from '../assets/img/icons8-最大化按钮-48.png'
import min_window_png from '../assets/img/icons8-最小化-50.png'
import close_window_png from '../assets/img/icons8-叉-50.png'
import restore_window_png from '../assets/img/icons8-restore-down-48.png'
import app_logo from '../assets/img/app_logo.png'
const windowManage = window.electron.windowManage
const isMaximized = window.electron.isMaximized
const getData = window.electron.getData
// 最小化窗口
function MinWin() {
    windowManage('mainWindow', 'min')
}
// 最大化窗口
function MaxWin() {
    const win_ico = document.querySelector('#max > img')
    if (isMaximized('mainWindow')){
        win_ico.src = big_window_png
    }else{
        win_ico.src = restore_window_png
    }
    windowManage('mainWindow', 'max')
}
// 关闭窗口
function CloseWin() {
    const go_hide = getData('go_hide', true)
    if (!go_hide) windowManage('mainWindow', 'close')
    else windowManage('mainWindow', 'hide')
}

function Headers() {
    return(
        <div id="headers">
            <div id="header-left">
                <div style={{width: '10px'}}></div>
                <img src={app_logo} alt="" id="app_logo"></img>
            </div>
            <div id="header-right">
                <div className="ico" id="min" onClick={MinWin}>
                    <img src={min_window_png} alt=""></img>
                </div>
                <div className="ico" id="max" onClick={MaxWin}>
                    <img src={big_window_png} alt=""></img>
                </div>
                <div className="ico" id="close" onClick={CloseWin}>
                    <img src={close_window_png} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Headers