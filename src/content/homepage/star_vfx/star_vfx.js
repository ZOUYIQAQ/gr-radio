import request_star from './request_star.js'
import star_img from '../../../assets/img/icons8-star-50.png'
import no_star_img from '../../../assets/img/icons8-nostar-50.png'
const getData = window.electron.getData
const saveData = window.electron.saveData
let now_star = -1
// 点亮几颗星星
function star_light(_num) {
    const num = parseInt(_num)
    const star_list = document.querySelectorAll('.star')
    if (!star_list) {
        console.log('没有星星')
        return
    }
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
    star_light(now_star)
}
// 更新音乐后星星归零
export function zero_star() {
    if (now_star) {
        now_star = -1
        star_light(now_star)
    }
}
// 点击星星回调函数
async function click_star(event) {
    const now_star_vfx = parseInt(event.target.getAttribute('vfx'))
    now_star = now_star_vfx
    const messages = await request_star(now_star_vfx)
    if (messages !== '感谢您的评分！') {
        now_star = -1
        star_light(-1)
    }
    saveData('now_star', now_star)
    window.tips(messages)
}
// 统一绑定事件
export function add_star_listener() {
    now_star = getData('now_star', -1)
    const star_list = document.querySelectorAll('.star')
    for (const star of star_list) {
        star.addEventListener('mouseover', only_touch)
        star.addEventListener('mouseout', leave_star)
        star.addEventListener('click', click_star)
    }
    star_light(now_star)
}