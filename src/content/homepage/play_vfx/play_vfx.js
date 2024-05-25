const getData = window.electron.getData
const saveData = window.electron.saveData
const is_playing_data_name = 'is_playing'
// 变化样式
function change_style(mode) {
    const player = document.querySelector('#player')
    const player_icon = document.querySelector('#player_icon')
    if (mode === 'play') {
        saveData(is_playing_data_name, 'play')
        player?.setAttribute('class','play_style')
        player_icon?.setAttribute('src', './img/icons8-播放-100.png')
    }else if (mode === 'pause') {
        saveData(is_playing_data_name, 'pause')
        player?.setAttribute('class','pause_style')
        player_icon?.setAttribute('src', './img/icons8-暂停-100.png')
    }else if (mode === 'stop') {
        saveData(is_playing_data_name, 'stop')
        player?.setAttribute('class','pause_style')
        player_icon?.setAttribute('src', './img/icons8-停止-100.png')
    }
}
// 初始化样式和事件
function init_play_vfx() {
    const mode = getData(is_playing_data_name, 'stop')
    change_style(mode)
}
export {init_play_vfx, change_style}