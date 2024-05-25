// 请求数据
async function get(url) {
    try {
        const response = await fetch(url)
        return response.text()
    } catch { return null }
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
    let other_datas = doc.querySelector('.content>p').innerHTML.trim()
    other_datas = other_datas.split('<br>').map(e => e.trim())
    // 专辑标题
    album_data['title'] = title
    // 制作团队
    album_data['production_team'] = production_team
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
    const album_data = await analyze(html_text)
    return album_data
}
await request_album('https://gensokyoradio.net/music/album/10008/')