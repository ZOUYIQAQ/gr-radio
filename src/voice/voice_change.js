const changeMusicVolume = window.electron.changeMusicVolume
const onChangeMusicPlayStatus = window.electron.onChangeMusicPlayStatus
let is_mouse_down = false
// 改变音乐音量
function change_music_volume(volume) {
    // 统一处理音量只传递小数
    volume = volume / 100
    // 指数化运算, 便于选择更小的音量
    volume = Math.pow(volume, 2)
    changeMusicVolume(volume)
}
// 获取声音进度条数字
function get_voice() {
    const voice_input = document.querySelector('.voice_input')
    const volume = 100 - voice_input.value
    return volume
}
// 声音进度条改变回调函数
function voice_change() {
    if (!is_mouse_down) return
    change_music_volume(get_voice())
}
// 初始化声音大小相关
function init_voice() {
    onChangeMusicPlayStatus(change_music_volume, get_voice)
    const voice_input = document.querySelector('.voice_input')
    voice_input.addEventListener('mousedown', ()=>{ is_mouse_down = true })
    voice_input.addEventListener('mouseup', ()=>{ is_mouse_down = false })
    voice_input.addEventListener('mousemove', voice_change)
}
export default init_voice