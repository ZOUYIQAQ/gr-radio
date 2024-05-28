const saveData = window.electron.saveData
const data_name = 'collect_data'
const changeCollecteData = window.electron.changeCollecteData
let is_get_ing = false
// 获取收藏数据
async function get() {
    if (is_get_ing) return
    is_get_ing = true
    const url = 'https://gensokyoradio.net/account/favorites/'
    let response
    try {
        response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
    } catch (e) {
        window.tips('收藏请求失败\n', e)
        is_get_ing = false
        return
    } finally { is_get_ing = false }
    return await response.text()
}
// 将日期字符串转换为标准格式
function parse_date_string(dateString) {
    // 创建一个月份映射
    const months = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    }
    // 使用正则表达式提取日期部分
    const datePattern = /(\w+)\s(\d+)(?:\w+),\s(\d{4})/
    const match = dateString.match(datePattern)
    if (match) {
        const month = months[match[1]]
        const day = match[2].padStart(2, '0')
        const year = match[3]
        return `${year}-${month ? month : '???'}-${day}`
    } else return ''
}

// 解析收藏数据
function analyze(html_text) {
    let collect_data = []
    const data = html_text
    const dp = new DOMParser()
    const doc = dp.parseFromString(data, 'text/html')
    const love_list = doc.querySelectorAll('div[class="column is-half"]')
    for (const love of love_list) {
        let song_data_dict = {}
        const ex_data_list = love.querySelector('.section').innerHTML.split('<br>').map(e => e.trim())
        const album = ex_data_list[2].split(' <s')[0]
        const title = love.querySelector('.has-text-weight-bold')?.innerText
        const author = ex_data_list[1].split(' - ')[0]
        const url = love.querySelector('a')?.href
        const img = love.querySelector('img')?.src
        let publisher = love.querySelector('.is-size-7').innerText
        publisher = publisher.substring(1, publisher.length - 1)
        let love_time = love.querySelector('p span')?.innerText.split(' on ')[1]
        love_time = parse_date_string(love_time)
        song_data_dict['title'] = title ? title : ''
        song_data_dict['author'] = author ? author : ''
        song_data_dict['album'] = album ? album : ''
        song_data_dict['publisher'] = publisher ? publisher : ''
        song_data_dict['love_time'] = love_time ? love_time : ''
        song_data_dict['url'] = url ? url : ''
        song_data_dict['img'] = img ? img : ''
        collect_data.push(song_data_dict)
    }
    return collect_data
}
// 封装函数
async function get_data() {
    const html_text = await get()
    if (!html_text) return
    const collect_data = analyze(html_text)
    saveData(data_name, JSON.stringify(collect_data))
    changeCollecteData()
    // window.tips('收藏数据获取成功')
    // return collect_data
}
export default get_data