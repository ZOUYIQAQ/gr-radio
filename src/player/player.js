import { Howl } from 'howler';
const onChangeMusicPlayStatus = window.electron.onChangeMusicPlayStatus
const onChangeMusicVolume = window.electron.onChangeMusicVolume
const player_url_1 = 'https://stream.gensokyoradio.net/1/'
// const player_url_2 = 'https://stream.gensokyoradio.net/2/'
// const player_url_3 = 'https://stream.gensokyoradio.net/3/'
const out_time = 3000
// const loding_out_time = 10000
let sound = null
let last_stop_time = 0
let stop_timeout_id = 0
let is_playing = false
// 获取当前时间戳
function get_timestamp() {
    return new Date().getTime()
}
// 创建播放器
function creater_player() {
    console.log('create player')
    sound = new Howl({
        src: [player_url_1],
        html5: true,
        volume: 0.5,
    })
    sound.on('playerror', function () {
        console.log('播放失败, 重新加载')
        sound.unload()
        creater_player()
    })
    sound.on('loaderror', () => {
        console.log('加载失败, 重新加载')
        sound.unload()
        creater_player()
    })
    sound.on('play', () => { is_playing = true })
    sound.on('pause', () => { is_playing = false })
    sound.on('stop', () => { is_playing = false })
    // 设定超时
    // setTimeout(() => {
    //     console.log('sound.state()', sound.state())
    //     if (sound.state() === 'loaded') return
    //     console.log('加载超时, 重新加载')
    //     sound.unload()
    //     creater_player()
    // }, loding_out_time)
}
// 播放
function player() {
    if (is_playing) return
    is_playing = true
    console.log('play')
    if (get_timestamp() - last_stop_time < out_time) {
        clearTimeout(stop_timeout_id)
        sound.play()
    } else {
        creater_player()
        sound.play()
    }
}
// 暂停
function pause() {
    if (sound === null) return
    console.log('pause')
    is_playing = false
    sound.pause()
}
// 停止
function stop() {
    console.log('stop')
    pause()
    last_stop_time = get_timestamp()
    stop_timeout_id = setTimeout(() => {
        console.log('unload')
        sound.unload()
    }, out_time)
}
// 设定声音大小
function setVolume(volume_num) {
    if (sound === null) return
    sound.volume(volume_num)
}
// 渲染进程消息响应
function sc_callback(mode) {
    if (mode === 'play') {
        player()
    } else if (mode === 'pause') {
        pause()
    } else if (mode === 'stop') {
        stop()
    }
}
// 初始化音乐播放器
function init_player() {
    onChangeMusicPlayStatus(sc_callback)
    onChangeMusicVolume(setVolume)
}
export default init_player