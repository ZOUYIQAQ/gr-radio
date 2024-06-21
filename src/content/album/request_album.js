const albumDatabaseAdd = window.electron.albumDatabaseAdd
const albumDatabaseGet = window.electron.albumDatabaseGet
let is_ruquest_get = false
// 请求数据
async function get(url) {
    if (is_ruquest_get) return null
    is_ruquest_get = true
    try {
        const response = await fetch(url)
        is_ruquest_get = false
        return response.text()
    } catch { 
        is_ruquest_get = false
        window.tips('获取专辑数据失败')
        return null 
    }
}
// 将日期字符串转换为标准格式
function parse_date_string(dateString) {
    // 创建一个月份映射
    const months = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }
    try {
        // 使用正则表达式提取日期部分
        const datePattern = /(\w+)\s(\d+)(?:\w+),\s(\d{4})/
        const match = dateString.match(datePattern)
        if (match) {
            const month = months[match[1]]
            const day = match[2].padStart(2, '0')
            const year = match[3]
            return `${year}-${month ? month : '???'}-${day}`
        } else return ''
    } catch (e) { return '' }
}
// 获取专辑内的各个歌曲的信息
async function get_tracks(doc) {
    let data_list = []
    const song_doc_list = doc.querySelectorAll('.table tbody tr')
    for (let song of song_doc_list) {
        let data = {}
        // 歌曲名
        const title = song.querySelector('.has-text-gr-pink').innerText.trim()
        // 原曲名
        let original_title = song.querySelector('.is-size-5>div[class="column"]')?.innerText.trim()
        original_title = original_title ? original_title : ''
        const ex_data = song.querySelectorAll('.is-size-6>div[class="column"]')
        // 编曲
        const arrangement = ex_data[0] ? ex_data[0].innerText.trim() : ''
        // 演唱
        const vocals = ex_data[1] ? ex_data[1].innerText.trim() : ''
        // 作词
        const lyrics = ex_data[2] ? ex_data[2].innerText.trim() : ''
        // 歌曲时长
        const time = song.querySelector('td[style="text-align: right;"]').innerText.trim()
        data['title'] = title
        data['original_title'] = original_title
        data['arrangement'] = arrangement
        data['vocals'] = vocals
        data['lyrics'] = lyrics
        data['time'] = time
        data_list.push(data)
    }
    return data_list
}
// 解析数据
async function analyze(html_text) {
    let album_data = {}
    const dp = new DOMParser()
    const doc = dp.parseFromString(html_text, 'text/html')
    // 专辑标题
    const title = doc.querySelector('.content>.title').innerText.trim()
    // 制作团队
    const production_team = doc.querySelector('.subtitle>a').innerText.trim()
    // 专辑封面
    const cover = doc.querySelector('.image>img').src
    let other_datas = doc.querySelector('.content>p').innerHTML.trim()
    other_datas = other_datas.split('<br>').map(e => e.trim())
    // 专辑标题
    album_data['title'] = title
    // 制作团队
    album_data['production_team'] = production_team
    // 专辑封面
    album_data['cover_url'] = cover
    // 歌曲基础信息大杂烩
    for (let data of other_datas) {
        let [key, value] = data.split(': ')
        if (key.length === 0) continue
        if (key === 'Release Date') value = parse_date_string(value)
        album_data[`${key}`] = value
    }
    // 专辑内歌曲具体信息
    album_data['tracks'] = await get_tracks(doc)
    return album_data
}
// 整合函数
async function request_album(url) {
    const html_text = await get(url)
    if (!html_text) return
    let album_data = await analyze(html_text)
    album_data['url'] = url
    const song_id = url.match(/music\/album\/(\d+)/)[1]
    albumDatabaseAdd(song_id, JSON.stringify(album_data))
    return album_data
}
// 测试
let is_geting = false
export default async function get_album_data(album_id) {
    if (is_geting) return
    is_geting = true
    let data = await albumDatabaseGet(album_id)
    if(data) data = JSON.parse(data)
    const url = `https://gensokyoradio.net/music/album/${album_id}/`
    if (!data) data = await request_album(url)
    // console.log(album_id, data)
    is_geting = false
    return data
}