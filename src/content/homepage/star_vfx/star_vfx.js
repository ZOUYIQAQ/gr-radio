import request_star from './request_star.js'
const getData = window.electron.getData
const saveData = window.electron.saveData
const data_name = 'song_data'
let now_start = -1
// 点亮几颗星星
function star_light(_num) {
    const star_img = 'img/icons8-star-50.png'
    const no_star_img = 'img/icons8-nostar-50.png'
    const num = parseInt(_num)
    const star_list = document.querySelectorAll('.star')
    for (const star of star_list) {
        const star_vfx = star.getAttribute('vfx')
        if (star_vfx <= num) star.src = star_img
        else star.src = no_star_img
    }
}
// 触摸星星回调函数
function only_touch(event) {
    const star_vfx = event.target.getAttribute('vfx')
    star_light(star_vfx)
}
// 离开星星回调函数
function leave_star(event) {
    star_light(now_start)
}
// 点击星星回调函数
async function click_star(event) {
    const now_star_vfx = parseInt(event.target.getAttribute('vfx'))
    now_start = now_star_vfx
    const messages = await request_star(now_star_vfx)
    if (messages !== '感谢您的评分！') {
        now_start = -1
        star_light(-1)
    }
    saveData('now_start', now_start)
    window.tips(messages)
}
// 歌曲是否确实发生了变化
function music_is_change() {
    const loc_data = getData(data_name)
    if (loc_data?.img) return false
    else return true
}
// 清空星星
export function clear_star() {
    if (!music_is_change()) return
    const pathname = window.location.pathname
    saveData('now_start', -1)
    if (pathname !== '/' && pathname !== '/homepage') return
    now_start = -1
    star_light(-1)
}
// 统一绑定事件
export function add_star_listener() {
    // 初始化星星
    now_start = getData('now_start')
    const star_list = document.querySelectorAll('.star')
    for (const star of star_list) {
        star.addEventListener('mouseover', only_touch)
        star.addEventListener('mouseout', leave_star)
        star.addEventListener('click', click_star)
    }
    star_light(now_start)
}