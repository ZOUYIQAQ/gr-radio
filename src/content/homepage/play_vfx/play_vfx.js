const getData = window.electron.getData
const saveData = window.electron.saveData
let play_control = document.querySelector('#play_control')
let play_text_doc = play_control?.querySelector('p')
let is_out = true
let is_down = false
// 鼠标进入函数
async function play_control_enter() {
    is_out = false
    if (is_down) return
    play_control.setAttribute('class', 'show')
    const play_text = play_text_doc.innerText
    play_text_doc.setAttribute('class', 'big_text')
    await new Promise(resolve => setTimeout(resolve, 100))
    if (play_text === 'stop!') {
        if (!is_out) play_text_doc.innerText = 'play?'
    }
    else if (play_text === 'play!') {
        play_text_doc.innerText = 'stop?'
    }
    play_text_doc.setAttribute('class', '')
}
// 鼠标离开函数
async function play_control_leave() {
    is_out = true
    const play_text = play_text_doc.innerText
    if (play_text !== 'stop!' && play_text !== 'play?') play_control.setAttribute('class', '')
    play_text_doc.setAttribute('class', 'min_text')
    if (play_text === 'stop?') {
        play_text_doc.innerText = 'play!'
        await new Promise(resolve => setTimeout(resolve, 300))
    }
    else if (play_text === 'play?') {
        play_text_doc.innerText = 'stop!'
        await new Promise(resolve => setTimeout(resolve, 150))
    }
    play_text_doc.setAttribute('class', '')
}
// 鼠标按下函数
async function play_control_down() {
    is_down = true
    const play_text = play_control.innerText
    play_control.setAttribute('class', 'show')
    if (play_text === 'stop?' || play_text === 'play!') {
        play_text_doc.innerText = 'stop!'
        saveData('is_playing', false)
    }
    if (play_text === 'play?' || play_text === 'stop!') {
        play_text_doc.innerText = 'play!'
        saveData('is_playing', true)
    }
    play_text_doc.setAttribute('class', 'super_big_text')
}
// 鼠标松开函数
async function play_control_up() {
    is_down = false
    await new Promise(resolve => setTimeout(resolve, 150))
    const play_text = play_control.innerText
    if (play_text === 'stop?' || play_text === 'play!') {
        play_control.setAttribute('class', '')
        saveData('is_playing', true)
    }
    if (play_text === 'play?' || play_text === 'stop!') {
        play_control.setAttribute('class', 'show')
        saveData('is_playing', false)
    }
    play_text_doc.setAttribute('class', '')
}

// 初始化
function init_play_control() {
    play_control = document.querySelector('#play_control')
    play_text_doc = play_control.querySelector('p')
    is_out = true
    is_down = false
    // 鼠标进入
    play_control.addEventListener('mouseenter', play_control_enter)
    // 鼠标离开
    play_control.addEventListener('mouseleave', play_control_leave)
    // 鼠标按下
    play_control.addEventListener('mousedown', play_control_down)
    // 鼠标松开
    play_control.addEventListener('mouseup', play_control_up)
    const is_playing = getData('is_playing', false)
    if (!is_playing) be_stop()
    else be_playing()
}
export { init_play_control, be_playing, be_stop }
// 正在播放
async function be_playing() {
    if (!document.querySelector('#play_control')) return
    play_control.setAttribute('class', 'show')
    play_text_doc.innerText = 'play!'
    play_text_doc.setAttribute('class', 'super_big_text')
    await new Promise(resolve => setTimeout(resolve, 150))
    play_control.setAttribute('class', '')
    play_text_doc.setAttribute('class', '')
}
// 正在暂停
async function be_stop() {
    if (!document.querySelector('#play_control')) return
    play_control.setAttribute('class', 'show')
    play_text_doc.innerText = 'stop!'
    play_text_doc.setAttribute('class', 'super_big_text')
    await new Promise(resolve => setTimeout(resolve, 150))
    play_control.setAttribute('class', 'show')
    play_text_doc.setAttribute('class', '')
}