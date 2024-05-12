import './homepage.css'
import add_star_listener from './star_vfx/star_vfx'
import add_love_listener from './love_vfx/love_vfx'
import init_play_vfx from './play_vfx/play_vfx'
import React, { useEffect } from 'react';
import change_music_data from './play_vfx/homepage_change'
import init_palyer from './play_vfx/homepage_player'
import init_color from '../../colour/colour'
// 星星列表
function StarList() {
    const star_img = 'img/icons8-nostar-50.png'
    let stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(<img className="star" src={star_img} alt="" key={i} vfx={i}></img>)
    }
    return stars
}
function Homepage() {
    // 页面初始化
    useEffect(() => {
        add_love_listener()
        init_play_vfx()
        add_star_listener()
        change_music_data()
        init_palyer()
        init_color()
    }, [])
    return (
        <div className='homepage'>
            <div id="content_left">
                <canvas id='canvas'></canvas>
                <div id="cover">
                    <div id='player' className='pause_style'>
                    {/* <!-- 音乐封面 --> */}
                    </div>
                    <img id="cover_img" src="/img/ex.png" alt=""></img>
                </div>
            </div>
            <div id="content_right">
                {/* <!-- 歌曲信息 --> */}
                <div id="information">
                    <p className='inf_text' id="name">歌曲名称</p>
                    <p className='inf_text' id="singer">歌手</p>
                    <p className='inf_text' id="album">专辑</p>
                    <p className='inf_text' id="publisher">发行商</p>
                    {/* <!-- 星星 --> */}
                    <div id="star_list">
                        <StarList />
                    </div>
                    {/* <!-- 心心 --> */}
                    <div id="love_div">
                        <img className="love" src="./img/icons8-nolove-24.png" alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Homepage