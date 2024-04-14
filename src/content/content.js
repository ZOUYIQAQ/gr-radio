import './content.css'
import ToolModule from './tools_list/tools_list'
// 星星列表
function StarList() {
    const star_img = 'img/icons8-nostar-50.png'
    let stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(<img className="star" src={star_img} alt="" key={i}></img>)
    }
    return stars
}
// 内容
function Content() {
    return (
        <div id="content">
            <ToolModule />
            <div id="content_left">
                {/* <!-- 音乐封面 --> */}
                <div id="cover">
                    <img id='pause_img' src='/img/icons8-play-100.png' alt=''></img>
                    <img id="cover_img" src="/img/ex.png" alt=""></img>
                </div>
            </div>
            <div id="content_right">
                {/* <!-- 歌曲信息 --> */}
                <div id="information">
                    <h2 id="name">歌曲名称</h2>
                    <p id="singer">歌手</p>
                    <p id="album">专辑</p>
                    <p id="publisher">发行商</p>
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
export default Content