const getData = window.electron.getData
// 获取song_id
const data_name = 'song_data'
const messages = {
    "1": "您未登录。",
    "2": "未连接到电台(音乐未播放)。",
    "3": "评分无效。",
    "4": "评分未提交(歌曲ID无效)。",
    "5": "评分未提交(非最近的歌曲)。",
    "6": "感谢您的评分！",
    "default": "评分未提交(未知错误)。"
}
function get_song_id() {
    const song_data = getData(data_name)
    if (!song_data) return 'GG'
    const json_data = JSON.parse(song_data)
    return json_data.songid
}
// 发送请求
async function get(star_num) {
    const song_id = get_song_id()
    if (song_id === 'GG') return messages.default
    const url = `https://gensokyoradio.net/js/rating.php?songid=${song_id}&rating=${star_num}`
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
    const ms_id = await response.text()
    const message = messages[ms_id] || messages.default
    return message
}
// 统一整合函数
async function request_star(star_num) {
    star_num += 1
    const message = await get(star_num)
    return message
}
export default request_star