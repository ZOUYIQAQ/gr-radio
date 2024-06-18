const {change_style} = require('../content/homepage/play_vfx/play_vfx')
const onChangeMusicPlayStatus = window.electron.onChangeMusicPlayStatus
const onChangeMusicVolume = window.electron.onChangeMusicVolume
const player_url_1 = 'https://stream.gensokyoradio.net/1/'
// const player_url_2 = 'https://stream.gensokyoradio.net/2/'
// const player_url_3 = 'https://stream.gensokyoradio.net/3/'
let audio = document.querySelector('#gr_radio')
const out_time = 150
let last_stop_time = 0
let stop_timeout_id = 0
let is_playing = false
// 获取当前时间戳
function now_time() {
    return new Date().getTime()
}
// 创建播放器
function creater_player() {
    console.log('create player')
    audio.src = player_url_1
    document.querySelector('audio').onerror = stop
}
// 播放
function play() {
    if (is_playing) return
    is_playing = true
    console.log('play')
    if (now_time() - last_stop_time < out_time) {
        clearTimeout(stop_timeout_id)
        audio.play().then(() => {
            is_playing = true
        }).catch(() => {
            is_playing = false
        })
    } else {
        creater_player()
        audio.play().then(() => {
            is_playing = true
        }).catch(() => {
            is_playing = false
        })
    }
}
// 暂停
function pause() {
    console.log('pause')
    audio.pause()
    is_playing = false
    document.querySelector('audio').onerror = null
}
// 停止
function stop() {
    pause()
    last_stop_time = now_time()
    stop_timeout_id = setTimeout(() => {
        console.log('stop')
        audio.src = ''
        change_style('stop')
    }, out_time);
}
// 设定声音大小
function setVolume(volume_num) {
    audio = document.querySelector('#gr_radio')
    audio.volume = volume_num
}
// 渲染进程消息响应
function sc_callback(mode) {
    audio = document.querySelector('#gr_radio')
    // 改变样式, 写在这里是为了兼容键盘事件
    if (mode === 'stop') change_style('pause')
    else change_style(mode)
    if (mode === 'play') {
        play()
    } else if (mode === 'pause') {
        pause()
    } else if (mode === 'stop') {
        stop()
    }
}
// 初始化音乐播放器
function init_player() {
    audio = document.querySelector('#gr_radio')
    onChangeMusicPlayStatus(sc_callback)
    onChangeMusicVolume(setVolume)
}
export default init_player