const getNowVersion = window.electron.getNowVersion

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

export default async function check_updates() {
    const now_version = getNowVersion()
    const last_version = await get_latest_version()
    console.log('now_version: ' + now_version + '\n', 'last_version: ' + last_version)
    if (!last_version) return
    if (last_version !== now_version) window.tips('有新版本可用, 请前往github下载最新版本')
}