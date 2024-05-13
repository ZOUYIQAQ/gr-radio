import './login_doc.css'
import { login, get_ap, logout } from './login'
const openLink = window.electron.openLink
const getData = window.electron.getData
const login_html = `<div id="overlay">
<div id="login_box">
    <div id="login_headers">
        登录
    </div>
    <div id="login_input_list">
        <input placeholder="账号" class="login_input" type="text" id="username" />
        <input placeholder="密码" class="login_input" type="password" id="password" />
    </div>
    <div>
        <div id="remember_box">
            <label for="remember">记住密码</label>
            <input type="checkbox" id="remember" />
        </div>
        <button id="login_btn" class="login_botton"> 登录 </button>
    </div>
    <div id="login_other">
        <button class="login_botton" id="login_other_left">注册</button>
        <button class="login_botton" id="login_other_right">忘记密码</button>
    </div>
</div>
</div>`
// 创建登录框
function creact_login_doc() {
    const cat_doc = document.createElement('LazyCat')
    document.body.appendChild(cat_doc)
    document.querySelector('LazyCat').outerHTML = login_html
    const user_data = get_ap()
    document.querySelector('#username').value = user_data['user']
    document.querySelector('#password').value = user_data['password']
    document.querySelector('#remember').checked = user_data['is_save']
}
// 删除登录框
function remove_login_doc(event) {
    if (event.target.id !== 'overlay') return
    document.querySelector('#overlay').remove()
}
// 登录
async function login_btn_click() {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const remember = document.querySelector('#remember').checked
    if (!username) window.tips('请输入账号')
    if (!password) window.tips('请输入密码')
    const name = await login(username, password, remember)
    window.tips('欢迎回来, '+name)
}
// 初始化用户名按钮
export function init_user_btn() {
    // 写上用户名
    const user = document.querySelector('#user')
    user.innerText = getData('user_name', '未登录')
    // 退出登录提示
    user.addEventListener('mouseenter', () => {
        const user = document.querySelector('#user')
        const user_text = user.innerText
        if (user_text !== '未登录' && user_text !== '点击登录') user.innerText = '退出登录'
        else user.innerText = '点击登录'
    })
    user.addEventListener('mouseleave', () => {
        const user = document.querySelector('#user')
        const user_text = user.innerText
        if (user_text !== '未登录') user.innerText = getData('user_name', '未登录')
    })
    // 自动登录一次
    const loc_data = get_ap()
    if (!loc_data['password'] || getData('is_out', true)) return
    login(loc_data['user'], loc_data['password'], loc_data['is_save'])
}
// 退出登录
// 初始化功能
export function init_login_doc() {
    if (document.querySelector('#user').innerText === '退出登录') {
        logout()
        window.tips("退出登录成功")
        return
    }
    creact_login_doc()
    document.querySelector('#overlay').addEventListener('mousedown', remove_login_doc)
    document.querySelector('#login_btn').addEventListener('click', login_btn_click)
    document.querySelector('#login_other_left').addEventListener('click', () => { openLink('https://gensokyoradio.net/register/') })
    document.querySelector('#login_other_right').addEventListener('click', () => { openLink('https://gensokyoradio.net/account/recover/') })
}