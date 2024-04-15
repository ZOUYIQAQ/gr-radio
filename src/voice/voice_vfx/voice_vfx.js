const saveData = window.electron.saveData
const getData = window.electron.getData
const voice_data_name = 'voice_data'
let is_mouse_down = false
// 改变声音图标样式
function change_voice_img(num) {
    const big_img = 'img/icons8-高音量-50.png'
    const normal_img = 'img/icons8-中等音量-50.png'
    const small_img = 'img/icons8-低容量-50.png'
    const none_img = 'img/icons8-静音-50.png'
    const voice_doc = document.querySelector('.voice')
    if (num >= 1 || num < 0) return
    if (num > 0.7) {
        voice_doc.src = big_img
    }else if (num > 0.4) {
        voice_doc.src = normal_img
    }else if (num > 0.1) {
        voice_doc.src = small_img
    }
    if (num === 0){
        voice_doc.src = none_img
    }
}
// 设定声音大小
function set_voice(num) {

}
// 声音改变时的回调函数
function voice_change(event) {
    if (!is_mouse_down) return
    const input_num = event.target.value
    change_voice_img(input_num/100)
    set_voice(input_num/100)
    saveData(voice_data_name, input_num)
}
// 初始化和绑定所有函数
function init_voice_vfx() {
    const loc_voice_data = getData(voice_data_name, 100)
    const voice_input = document.querySelector('.voice_input')
    voice_input.value = loc_voice_data
    change_voice_img(loc_voice_data/100)
    voice_input.addEventListener('mousedown', ()=>{is_mouse_down = true})
    voice_input.addEventListener('mouseup', ()=>{is_mouse_down = false})
    voice_input.addEventListener('mousemove', voice_change)
}
export default init_voice_vfx