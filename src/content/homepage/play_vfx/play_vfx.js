const getData = window.electron.getData
const saveData = window.electron.saveData
const is_playing_data_name = 'is_playing'
// 变化样式
function change_style(mode) {
    const player = document.querySelector('#player')
    if (mode === '播放') {
        saveData(is_playing_data_name, true)
        player.setAttribute('class','play_style')
    }else if (mode === '暂停') {
        saveData(is_playing_data_name, false)
        player.setAttribute('class','pause_style')
    }
}
// 样式回调事件
function change_style_callback(e) {
    const player = e.target
    const mode = player.getAttribute('class')
    if (mode === 'play_style') {
        change_style('暂停')
    }else if (mode === 'pause_style') {
        change_style('播放')
    }
}
// 绑定事件
function add_play_listener(){
    const play_doc = document.querySelector('#player')
    play_doc.addEventListener("click",change_style_callback, false)
}
// 初始化样式和事件
function init_play_vfx() {
    const mode = getData(is_playing_data_name, false) ? '播放' : '暂停'
    change_style(mode)
    add_play_listener()
}
export default init_play_vfx