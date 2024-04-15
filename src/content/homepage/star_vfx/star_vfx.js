const star_img = 'img/icons8-star-50.png'
const no_star_img = 'img/icons8-nostar-50.png'
const saveData = window.electron.saveData
const getData = window.electron.getData
const star_data_name = 'star_data'
// 点亮几颗星星
function star_light(_num){
    const num = parseInt(_num)
    const star_list = document.querySelectorAll('.star')
    for (const star of star_list){
        const star_vfx = star.getAttribute('vfx')
        if (star_vfx <= num) star.src = star_img
        else star.src = no_star_img
    }
}
// 触摸星星回调函数
function only_touch(event){
    const star_vfx = event.target.getAttribute('vfx')
    star_light(star_vfx)
}
// 离开星星回调函数
function leave_star(event) {
    const loc_star_vfx = getData(star_data_name, -1)
    star_light(loc_star_vfx)
}
// 点击星星回调函数
function click_star(event) {
    const now_star_vfx = parseInt(event.target.getAttribute('vfx'))
    saveData(star_data_name, now_star_vfx)
}
// 统一绑定事件
function add_star_listener() {
    // 初始化星星
    saveData(star_data_name, -1)
    const star_list = document.querySelectorAll('.star')
    for (const star of star_list){
        star.addEventListener('mouseover', only_touch)
        star.addEventListener('mouseout', leave_star)
        star.addEventListener('click', click_star)
    }
}
export default add_star_listener