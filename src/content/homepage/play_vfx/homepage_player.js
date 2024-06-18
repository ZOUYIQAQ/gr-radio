const changeMusicPlayStatus = window.electron.changeMusicPlayStatus
// 播放
function play() {
    changeMusicPlayStatus('play')
}
// 暂停
function pause() {
    changeMusicPlayStatus('pause')
}
// 停止
function stop() {
    changeMusicPlayStatus('stop')
}
// 判断当前播放状态
function isPlaying() {
    const play_text = document.querySelector('#play_control').innerText
    if (play_text === 'stop!' || play_text === 'play?'){
        return true
    }else {
        return false
    }
}
// 是否播放
function change_status() {
    if (isPlaying()){
        stop()
    }else {
        play()
    }
}
// 添加回调函数
function  init_palyer() {
    const play_doc = document.querySelector('#play_control')
    play_doc.addEventListener('click', change_status, true)
}
export default init_palyer