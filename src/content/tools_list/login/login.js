const saveData = window.electron.saveData
const getData = window.electron.getData
const url = 'https://gensokyoradio.net/login/loginProcess.php'
// 登录
export async function login(user, password, remember) {
    const form = new FormData()
    form.append('user', user)
    form.append('pass', password)
    if (remember) save_ap(user, password, remember)
    else save_ap(user, '', false)
    let data = null
    let name = '未登录'
    const response = await fetch(url, {
        method: 'POST',
        body: form
    })
    data = await response.json()
    if (data['error'] || !data) {
        const up_gg = 'Incorrect username\/password'
        const message = data['passError']?data['passError']:'登录失败(未知错误)'
        if (message !== up_gg) window.tips(message)
        return
    }
    name = data['info'].match(/"Logged in as (.+)/)[1].split('"')[0]
    document.querySelector('#user').innerText = name
    saveData('user_name', name)
    document.querySelector('#overlay')?.remove()
    saveData('is_out', false)
    return name
}
// 退出的奴
export async function logout() {
    const out_url = 'https://gensokyoradio.net/logout/'
    fetch(out_url)
    saveData('user_name', '未登录')
    saveData('is_out', true)
}
// 保存账号密码
function save_ap(user, password, is_save) {
    saveData('user', user)
    saveData('password', btoa(password))
    saveData('is_save', is_save)
}
// 获取本地账号密码
export function get_ap() {
    const user = getData('user', '')
    const password = getData('password', '')
    const is_save = getData('is_save', false)
    return { 'user': user, 'password': atob(password), 'is_save': is_save }
}