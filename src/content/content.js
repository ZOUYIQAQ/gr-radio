import './content.css'
// 功能列表
function ToolList() {
    const tools_name = [
        { 'id': 'user', 'text': '未登录', 'key': 0 },
        { 'id': 'radio', 'text': '主页', 'key': 1 },
        { 'id': 'collect', 'text': '收藏', 'key': 2 },
        { 'id': 'playlist', 'text': '专辑', 'key': 3 },
        { 'id': 'news', 'text': '新闻', 'key': 4 },
        { 'id': 'comment', 'text': '评论', 'key': 5 },
        { 'id': 'setting', 'text': '设置', 'key': 6 }
    ]
    const tools = tools_name.map((tool) => {
        return <div id={tool['id']} className="tool" key={tool['key']}>{tool.text}</div>
    })
    return tools
}
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
            <div id="tool_list">
                <div id='tool_list_content'>
                    <ToolList />
                </div>
            </div>
            <div id="hidden_tools_button">
                <h2>{'<'}</h2>
            </div>
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