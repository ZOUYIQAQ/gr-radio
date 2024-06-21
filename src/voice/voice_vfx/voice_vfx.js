import big_img from '../../assets/img/icons8-高音量-50.png'
import normal_img from '../../assets/img/icons8-中等音量-50.png'
import small_img from '../../assets/img/icons8-低容量-50.png'
import none_img from '../../assets/img/icons8-静音-50.png'
const saveData = window.electron.saveData
const getData = window.electron.getData
const voice_data_name = 'voice_data'
let is_mouse_down = false
// 改变声音图标样式
function change_voice_img(num) {
    num = num / 100
    const voice_doc = document.querySelector('.voice')
    if (num >= 1 || num < 0) return
    if (num > 0.85) {
        voice_doc.src = big_img
    }else if (num > 0.3) {
        voice_doc.src = normal_img
    }else if (num > 0.1) {
        voice_doc.src = small_img
    }
    if (num === 0){
        voice_doc.src = none_img
    }
}
// 获取声音大小
function get_voice() {
    const voice_input = document.querySelector('.voice_input')
    return 100 - voice_input.value
}
// 设定声音大小
function set_voice(num) {
    const voice_input = document.querySelector('.voice_input')
    voice_input.value = 100 - num
}
// 声音改变时的回调函数
function voice_change(event) {
    if (!is_mouse_down) return
    change_voice_img(get_voice())
}
// 初始化和绑定所有函数
function init_voice_vfx() {
    set_voice(getData(voice_data_name, 100))
    change_voice_img(get_voice())
    const voice_input = document.querySelector('.voice_input')
    voice_input.addEventListener('mousedown', ()=>{is_mouse_down = true})
    voice_input.addEventListener('mouseup', ()=>{
        is_mouse_down = false
        saveData(voice_data_name, get_voice())
    })
    voice_input.addEventListener('mousemove', voice_change)
}
export default init_voice_vfx