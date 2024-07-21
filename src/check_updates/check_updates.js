const getNowVersion = window.electron.getNowVersion
const getData = window.electron.getData
let is_get = false

async function get_latest_version() {
    if (is_get) return
    is_get = true
    const url = 'https://api.github.com/repos/ZOUYIQAQ/gr-radio/releases/latest'
    let response
    try {
        response = await fetch(url)
        const response_data = await response.json()
        is_get = false
        return response_data.tag_name.split('v')[1]
    } catch (err) {
        is_get = false
        return null
    }
}

export default async function check_updates(msg=false) {
    if (msg) {
        const aout_show = getData('update_switch', true)
        if (!aout_show) return
    }
    const now_version = getNowVersion()
    const last_version = await get_latest_version()
    console.log('now_version: ' + now_version + '\n', 'last_version: ' + last_version)
    if (!last_version) {
        if (msg) window.tips('获取最新版本失败')
        return
    }
    if (last_version !== now_version) window.tips('有新版本可用, 请前往github下载最新版本')
    if (msg && last_version === now_version) window.tips('已是最新版本')
}