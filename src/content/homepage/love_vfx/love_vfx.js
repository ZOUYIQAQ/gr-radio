const saveData = window.electron.saveData
const getData = window.electron.getData
const love_data_name = 'love_data'
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
    const loc_love_data = getData(love_data_name, 'no_love')
    change_love(loc_love_data)
}
// 点击心心特效
function click_love() {
    const loc_love_data = getData(love_data_name, 'no_love')
    if (loc_love_data === 'love') {
        change_love('no_love')
        saveData(love_data_name, 'no_love')
    } else {
        change_love('love')
        saveData(love_data_name, 'love')
    }
}
// 绑定心心事件
function add_love_listener() {
    // 初始化心心
    saveData(love_data_name, 'no_love')
    const love = document.querySelector('.love')
    love.addEventListener('mouseover', touch_love)
    love.addEventListener('mouseout', leave_love)
    love.addEventListener('click', click_love)
}

export default add_love_listener