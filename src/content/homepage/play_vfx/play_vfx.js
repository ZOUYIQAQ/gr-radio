// 变化样式
function change_style(mode) {
    const player = document.querySelector('#player')
    if (mode === '播放') {
        player.setAttribute('class','play_style')
    }else if (mode === '暂停') {
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
    play_doc.addEventListener("click",change_style_callback)
}
export default add_play_listener