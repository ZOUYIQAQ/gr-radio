import './collect.css'
import get_data from './requests_collect'
import { get_row_count } from './collect_vfx/collect_vfx'
import React, { useEffect, useState  } from 'react'
import album_id_change from './album_id_change'
const getData = window.electron.getData
const data_name = 'collect_data'
let collect_song_data, set_collect_song_data
// 更新收藏列表
export function updata_collect_data() {
    if (!set_collect_song_data) {
        collect_song_data = JSON.parse(getData(data_name))
        return
    }
    try {
        set_collect_song_data(JSON.parse(getData(data_name)))
    } catch (e) {
        set_collect_song_data(null)
    }
}
function CollectPage() {
    [collect_song_data, set_collect_song_data] = useState(JSON.parse(getData(data_name)))
    // 初始化设置行数
    useEffect(() => {
        const rowCount = get_row_count()
        const collect_page = document.querySelector('#collect_page')
        collect_page.style['grid-template-columns'] = `repeat(${rowCount}, auto)`
        get_data()
        updata_collect_data()
    }, [])
    return (
        <div id='collect_page'>
            {!collect_song_data || collect_song_data.length === 0 ? <div id='collect_err'>收藏为空, 请检查登录和网络状态</div> : collect_song_data.map((item, index) => (
                <div key={index} className='exterior_box'>
                    <div className="song_data"  onClick={()=>{album_id_change(item.url)}}>
                        <div className='cover_data_box'>
                            <img className='song_cover' src={item?.img} alt=''></img>
                            <div className='song_datas'>
                                <div className='song_name'>{item.title}</div>
                                <div className='song_singer'>{item.author}</div>
                                <div className='song_album'>{item.album}</div>
                                <div className='publisher'>{item.publisher}</div>
                            </div>
                        </div>
                        <div className='love_time'>{item.love_time}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CollectPage