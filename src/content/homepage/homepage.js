import './homepage.css'
import { add_star_listener } from './star_vfx/star_vfx'
import request_star from './star_vfx/request_star'
import { add_love_listener } from './love_vfx/love_vfx'
import { init_play_control } from './play_vfx/play_vfx'
import React, { useEffect, useState } from 'react'
import init_palyer from './play_vfx/homepage_player'
import { init_color } from '../../colour/colour'
import init_change_album_id from './play_vfx/album_id_change'
import { init_music_visualization } from './music_visualization/music_visualization'
import star_img from '../../assets/img/icons8-star-50.png'
import no_star_img from '../../assets/img/icons8-nostar-50.png'
import cover_img from '../../assets/img/ex.png'
import love_img from '../../assets/img/icons8-love-24.png'
import no_love_img from '../../assets/img/icons8-nolove-24.png'
const getData = window.electron.getData
const saveData = window.electron.saveData
let set_now_love, set_now_star
let song_data, set_song_data
const ex_data = JSON.stringify({
    'img': cover_img,
    'title': '标题',
    'artist': '歌手',
    'album': '专辑',
    'circle': '发行商'
})
// 初始化数据
export function init_show_song_data() {
    saveData('now_star', -1)
    saveData('is_love', 'no_love')
}
// 更新音乐数据
export function update_song_data() {
    init_show_song_data()
    if (!set_song_data) {console.log('set_song_data 未初始化')
        return}
    console.log('更新音乐数据')
    const json_data = getData('song_data', ex_data)
    const dict_data = JSON.parse(json_data)
    set_song_data(dict_data)
    set_now_star(-1)
    set_now_love('no_love')
}
function init_music_data() {
    const json_data = getData('song_data', ex_data)
    const dict_data = JSON.parse(json_data)
    set_song_data(dict_data)
}
// 星星列表
function StarList({now_star}) {
    let stars = []
    for (let i = 0; i < 5; i++) {
        let srt_data = (i <= now_star) ? star_img : no_star_img
        stars.push(<img className="star" src={srt_data} alt="" key={i} vfx={i}></img>)
    }
    return stars
}
function Homepage() {
    const [_song_data, _set_song_data] = useState(getData('song_data', ex_data))
    song_data = _song_data
    set_song_data = _set_song_data
    const [_now_star, _set_now_star] = useState(getData('now_star', -1))
    set_now_star = _set_now_star
    const [_now_love, _set_now_love] = useState(getData('is_love', 'no_love'))
    set_now_love = _set_now_love
    // 页面初始化
    useEffect(() => {
        add_love_listener()
        add_star_listener()
        init_play_control()
        init_palyer()
        init_color()
        init_change_album_id()
        init_music_visualization()
        init_music_data()
    }, [])
    return (
        <div className='homepage'>
            <div id="content_left">
                <div id="cover">
                    <canvas id='canvas_bg'></canvas>
                    <div id='play_control' className="show">
                        <p>stop!</p>
                    </div>
                    {/* <!-- 音乐封面 --> */}
                    <img id="cover_img" src={song_data.img} alt=""></img>
                </div>
            </div>
            <div id="content_right">
                {/* <!-- 歌曲信息 --> */}
                <div id="information">
                    <p className='inf_text' id="name">{song_data.title}</p>
                    <p className='inf_text' id="singer">{song_data.artist}</p>
                    <p className='inf_text' id="album">{song_data.album}</p>
                    <p className='inf_text' id="publisher">{song_data.circle}</p>
                    {/* <!-- 星星 --> */}
                    <div id="star_list">
                        <StarList now_star={_now_star} />
                    </div>
                    {/* <!-- 心心 --> */}
                    <div id="love_div">
                        <img className="love" src={_now_love === 'love' ? love_img : no_love_img} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Homepage