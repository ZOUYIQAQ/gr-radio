const getData = window.electron.getData
const saveData = window.electron.saveData
const updataNewsData = window.electron.updataNewsData
const news_data_naem = 'news_data'
// 获取新闻页面
async function get() {
    try{
        const url = 'https://gensokyoradio.net/news/'
        const respons = await fetch(url)
        return await respons.text()
    }catch(e){
        window.tips('获取新闻数据失败')
        return
    }
}
// 解析新闻页面, 获取新闻数据
function analyze(html_text) {
    let news_data = {}
    let news_list = []
    const db = new DOMParser()
    const doc = db.parseFromString(html_text, 'text/html')
    let news_doc_list = doc.querySelectorAll('article[class="media"]')
    const news_doc_array = Array.from(news_doc_list)
    const more_news_link = news_doc_array.pop().querySelector('a').href
    for (let news_doc of news_doc_array) {
        let data = {}
        const title = news_doc.querySelector('article[class="media"] strong').innerText
        const time = news_doc.querySelector('article[class="media"] small').innerText
        const img_url = news_doc.querySelector('article[class="media"] img').src
        const linke = news_doc.querySelector('article[class="media"] a').href
        data['title'] = title
        data['time'] = time ? time : ''
        data['img_url'] = img_url ? img_url.replace('file:///D:/', 'https://gensokyoradio.net/') : ''
        data['linke'] = linke ? 'https://gensokyoradio.net/' + linke.match(/(news.+)/)[0] : ''
        news_list.push(data)
    }
    news_data['news_list'] = news_list
    news_data['more_news_link'] = more_news_link
    return news_data
}
// 从网络获取新闻数据整合函数
async function request_news_data() {
    const html_text = await get()
    if (!html_text) return
    let news_data
    try {
        news_data = analyze(html_text)
    }catch (e) {
        window.tips('解析新闻数据失败')
        return
    }
    saveData(news_data_naem, news_data)
    updataNewsData()
    return news_data
}
// 获取数据整合函数
function get_news_data() {
    let news_data = getData(news_data_naem, {'news_list': [], 'more_news_link': ''})
    request_news_data()
    return news_data
}
export default get_news_data