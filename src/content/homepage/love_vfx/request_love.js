const getData = window.electron.getData
const data_name = 'song_data'
const messages = {
    "Success": "成功",
    "Song is already added as a favorite": "歌曲已经添加喜爱过了",
    "You are not logged in.": "未登录",
    // "3": "评分无效。",
    // "4": "评分未提交(歌曲ID无效)。",
    // "5": "评分未提交(非最近的歌曲)。",
    "default": "收藏失败(未知错误)。"
}
// 请求
async function post(url, from_data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: from_data,
            credentials: 'include'
        })
        return await response.json()
    } catch (e) { return 'GG' }
}
// 根据返回信息获取对应的提示信息
function get_message(object_data) {
    const data = object_data
    if (data['RESULT'] === 'Success') {
        return messages['Success']
    }else if (data['RESULT'].includes('Error')) {
        return messages[data['ERROR']]
    }
    else {
        return messages['default']
    }
}
// 临时获取提示信息(中文尚未完成)
function ex_get_message(object_data) {
    const data = object_data
    if (data['RESULT'] === 'Success') {
        return '成功'
    }
    else {
        return data['ERROR']
    }
}
// 获取歌曲id
function get_song_id() {
    const song_data = getData(data_name)
    if (!song_data) return 'GG'
    const json_data = JSON.parse(song_data)
    return json_data.songid
}
// 喜欢
async function love(is_true) {
    const love_url = 'https://gensokyoradio.net/js/add_favorite.php'
    const dislove_url = 'https://gensokyoradio.net/js/remove_favorite.php'
    const url = is_true ? love_url : dislove_url
    const song_id = get_song_id()
    if (song_id === 'GG') return 'GG'
    let from_data = new FormData()
    from_data.append('id', song_id)
    const response = await post(url, from_data)
    // 获取提示信息, 中文尚未完成
    const result = ex_get_message(response)
    return result
}
export default love