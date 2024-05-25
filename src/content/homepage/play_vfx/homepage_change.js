const getData = window.electron.getData
const data_name = 'song_data'
// 改变图片
function changeImg(base64_img) {
    const img_dom = document.getElementById('cover_img')
    img_dom.src = base64_img
}
// 改变歌名
function changeName(name) {
    const name_dom = document.getElementById('name')
    name_dom.innerText = name
}
// 改变歌手
function changeSinger(singer) {
    const singer_dom = document.getElementById('singer')
    singer_dom.innerText = singer
}
// 改变专辑
function changeAlbum(album) {
    const album_dom = document.getElementById('album')
    album_dom.innerText = album
}
// 改变发行商
function changeCompany(company) {
    const company_dom = document.getElementById('publisher')
    company_dom.innerText = company
}
// 改变所有
function changeAll(data) {
    const pathname = window.location.pathname
    if (pathname !== '/' && pathname !== '/homepage') return
    changeImg(data.img)
    changeName(data.title)
    changeSinger(data.artist)
    changeAlbum(data.album)
    changeCompany(data.circle)
}
// 获取数据
export function getDataFun() {
    const json_data = getData(data_name, null)
    if (json_data === null) return
    changeAll(JSON.parse(json_data))
}
// 初始化
export function change_music_data() {
    getDataFun()
}