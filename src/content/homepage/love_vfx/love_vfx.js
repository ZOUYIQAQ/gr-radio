import love from './request_love'
const getData = window.electron.getData
const saveData = window.electron.saveData
const data_name = 'song_data'
let is_love = 'no_love'
// 改变心心状态
function change_love(mode) {
    const love_img = 'img/icons8-love-24.png'
    const no_love_img = 'img/icons8-nolove-24.png'
    const love = document.querySelector('.love')
    switch (mode) {
        case 'love':
            love.src = love_img
            break;
        case 'no_love':
            love.src = no_love_img
            break;
        default:
            console.error('传递心心状态错误')
            break;
    }
}
// 触摸心心特效
function touch_love() {
    change_love('love')
}
// 离开心心特效
function leave_love() {
    change_love(is_love)
}
// 点击心心特效
async function click_love() {
    let result;
    if (is_love === 'love') {
        change_love('no_love')
        is_love = 'no_love'
        result = await love(false)
        if (result !== '成功' && result !== 'Song is already added as a favorite') {
            change_love('love')
            is_love = 'love'
        }
    } else {
        change_love('love')
        is_love = 'love'
        result = await love(true)
        if (result !== '成功' && result !== 'Song is already added as a favorite') {
            change_love('no_love')
            is_love = 'no_love'
        }
    }
    saveData('is_love', is_love)
    window.tips(result)
}
// 歌曲是否确实发生了变化
function music_is_change() {
    const loc_data = getData(data_name)
    if (loc_data.img) return false
    else return true
}
// 清空心心
export function clear_love() {
    if (!music_is_change()) return
    const pathname = window.location.pathname
    saveData('is_love', 'no_love')
    if (pathname !== '/' && pathname !== '/homepage') return
    change_love('no_love')
    is_love = 'no_love'
}
// 绑定心心事件
export function add_love_listener() {
    // 初始化心心
    is_love = getData('is_love', 'no_love')
    const love = document.querySelector('.love')
    love.addEventListener('mouseover', touch_love)
    love.addEventListener('mouseout', leave_love)
    love.addEventListener('click', click_love)
    change_love(is_love)
}