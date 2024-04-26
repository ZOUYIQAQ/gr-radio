import './homepage.css'
import add_star_listener from './star_vfx/star_vfx'
import add_love_listener from './love_vfx/love_vfx'
import add_play_listener from './play_vfx/play_vfx'
import React, { useEffect } from 'react';
import change_music_data from './homepage_change'
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
        add_play_listener()
        add_star_listener()
        change_music_data()
    }, [])
    return (
        <div className='homepage'>
            <div id="content_left">
                {/* <!-- 音乐封面 --> */}
                <div id="cover">
                    <div id='player' className='play_style'>

                    </div>
                    <img id="cover_img" src="/img/ex.png" alt=""></img>
                </div>
            </div>
            <div id="content_right">
                {/* <!-- 歌曲信息 --> */}
                <div id="information">
                    <h2 className='inf_text' id="name">歌曲名称</h2>
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