const updateMusicAlbumId = window.electron.updateMusicAlbumId
// 从url中获取album_id
function get_album_id(url) {
    try{
        const a_id = url.match(/music\/album\/(\d+)/)[1]
        return a_id
    }catch(e){return}
}
// 点击回调事件
export default function album_id_change(url) {
    const a_id = get_album_id(url)
    if(!a_id) {
        window.tips('这首歌没有专辑')
        return
    }
    updateMusicAlbumId(a_id)
    document.querySelector('#playlist').click()
}