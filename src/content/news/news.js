import './news.css'
import React, { useEffect, useState } from 'react'
import get_news_data from './requests_news'
const getData = window.electron.getData
const openLink = window.electron.openLink
const data_name = 'news_data'
let news_data, set_news_data
// 跟新数据
export function up_news_data() {
    if (!set_news_data) return
    set_news_data(getData(data_name, {'news_list': [], 'more_news_link': ''}))
}
function NewsList({data_list}) {
    if (data_list.length === 0) return <div>空空如也</div>
    return data_list.map((item, index) => (
        <div key={index} className='news_item' onClick={()=>{if (!item.link) openLink(item.linke); else window.tips('找不到链接'+item.linke)}}>
            <img src={item.img_url} className='background'></img>
            <img className='news_img' src={item.img_url} alt=''></img>
            <div className='news_text'>
                <div className='news_title'>{item.title}</div>
                <div className='news_time_box'>
                    <div className='news_time'>{item.time}</div>
                </div>
            </div>
        </div>
    ))

}
function NewsPage() {
    [news_data, set_news_data] = useState({'news_list': [], 'more_news_link': ''})
    useEffect(() => {
        set_news_data(get_news_data())
    }, [])
    return (
        <div id='news_page'>
            <div id='news_list'>
                <NewsList data_list={news_data?.news_list} />
            </div>
        </div>
    )
}

export default NewsPage