const getData = window.electron.getData
const saveData = window.electron.saveData
const updataReviewData = window.electron.updataReviewData
const review_data_name = 'review_data'
// 获取评论页面
async function get() {
    try{
        const url = 'https://gensokyoradio.net/reviews/'
        const respons = await fetch(url)
        return await respons.text()
    }catch(e){
        window.tips('获取评论数据失败')
        return
    }
}
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
        data['img_url'] = img_url ? img_url : ''
        data['linke'] = linke ? 'https://gensokyoradio.net/' + linke.match(/(\/reviews.+)/)[0] : ''
        news_list.push(data)
    }
    news_data['news_list'] = news_list
    news_data['more_news_link'] = more_news_link
    return news_data
}
// 从网络获取新闻数据整合函数
async function request_review_data() {
    const html_text = await get()
    if (!html_text) return
    let review_data
    try {
        review_data = analyze(html_text)
    }catch (e) {
        window.tips('解析新闻数据失败')
        return
    }
    saveData(review_data_name, review_data)
    updataReviewData()
    return review_data
}
// 获取数据整合函数
function get_review_data() {
    let review_data = getData(review_data_name, {'news_list': [], 'more_news_link': ''})
    request_review_data()
    return review_data
}
export default get_review_data