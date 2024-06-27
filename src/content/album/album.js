import './album.css'
import React, { useEffect, useState } from 'react'
import get_album_data from './request_album'
const getData = window.electron.getData
const openLink = window.electron.openLink
const data_name = 'song_data'
const base_data = {
    'tracks':[],
    'cover_url': '',
    'title': '',
    'production_team': '',
    'url': '',
}
let album_data, set_album_data
// 专辑id
let now_album_id = JSON.parse(getData(data_name))?.albumid
// 更新数据
export function updata_album_data(album_id) {
    if (!album_id) return
    album_id = parseInt(album_id)
    now_album_id = album_id
}
// 获取杂七杂八的数据
function get_other_data(data) {
    if (!data) return {__html: ''}
    let other_keys = []
    for (let key of Object.keys(data)){
        const ex_list = ['tracks', 'cover_url', 'url', 'title', 'production_team']
        if (!ex_list.includes(key)) other_keys.push(key)
    }
    let other_datas = []
    for (let key of other_keys) other_datas.push(`${key}: ${data[key]}`)
    const datas = other_datas.join('<br/>')
    return {__html: datas}
}
function SongList({song_data_list}) {
    if (!song_data_list) return
    return song_data_list.map((song_data, index) => (
        <div key={index} className='song_item'>
            <div className='song_title'>{song_data['title']}</div>
            <div className='song_origin'>原曲: {song_data['original_title']}</div>
            <div className='song_vocals'>演唱: {song_data['vocals']}</div>
            <div className='song_arrangement'>编曲: {song_data['arrangement']}</div>
            <div className='song_lyrics'>作词: {song_data['lyrics']}</div>
            <div className='song_duration'>{song_data['time']}</div>
        </div>
    ))
}
function AlbumPage() {
    [album_data, set_album_data] = useState(base_data)
    useEffect(() => {
        now_album_id = now_album_id ? now_album_id : 11723 
        get_album_data(now_album_id).then(data => set_album_data(data))
    }, [now_album_id])
    return (
        <div id='albump_page'>
            <div id='albump_data'>
                <div id='albump_background' style={{backgroundImage: `url(${album_data?.cover_url})`}}></div>
                <img id='albump_data_img' src={album_data?.cover_url} alt=''></img>
                <div id='albump_data_text'>
                    <div id='albump_data_title'>{album_data?.title}</div>
                    <div id='albump_data_artist'>{album_data?.production_team}</div>
                    <div id='albump_other_data' dangerouslySetInnerHTML={get_other_data(album_data)}></div>
                    <a id='albump_data_link' herf={album_data?.url} onClick={()=>{if (album_data?.url) openLink(album_data?.url); else window.tips('请等待专辑加载完毕')}}>专辑页面链接</a>
                </div>
            </div>
            <div id='song_list'>
                <SongList song_data_list={album_data?.tracks} />
            </div>
        </div>
    )
}
export default AlbumPage