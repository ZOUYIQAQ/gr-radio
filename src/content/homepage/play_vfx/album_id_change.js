const getData = window.electron.getData
const updateMusicAlbumId = window.electron.updateMusicAlbumId
// 获取song_id
const data_name = 'song_data'
// 双击回调函数
function up_album_id() {
    // 更新专辑id
    updateMusicAlbumId(JSON.parse(getData(data_name))?.albumid)
    // 跳转页面
    document.querySelector('#playlist').click()
}
// 绑定事件
function init_change_album_id() {
    document.querySelector('#album').addEventListener('click', up_album_id)
}
export default init_change_album_id