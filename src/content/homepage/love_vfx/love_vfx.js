import love from './request_love'
import love_img from '../../../assets/img/icons8-love-24.png'
import no_love_img from '../../../assets/img/icons8-nolove-24.png'
const getData = window.electron.getData
const saveData = window.electron.saveData
let is_love = 'no_love'
// 改变心心状态
function change_love(mode) {
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