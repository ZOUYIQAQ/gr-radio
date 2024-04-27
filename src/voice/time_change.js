// const saveData = window.electron.saveData
const getData = window.electron.getData
const onChangeMusicData = window.electron.onChangeMusicData
const data_name = 'song_data'
// 歌曲总时长
let all_time = 0
// 已播放时长
let current_time = 0
// 更改时间
function change_time_doc(time_str){
    const time_doc = document.querySelector('#time_p')
    time_doc.innerText = time_str
}
// 更改进度
function change_progress_doc(progress_num){
    const progress = document.querySelector('#progress')
    progress.style.width = progress_num * 100 + '%'
}
// 获取进度
function get_time_str(){
    const all_m_time_str = String(parseInt(all_time / 60))
    let all_s_time_str = String(all_time - all_m_time_str * 60)
    const current_m_time_str = String(parseInt(current_time / 60))
    let current_s_time_str = String(current_time - current_m_time_str * 60)
    if (all_s_time_str.length <= 1) all_s_time_str = '0' + all_s_time_str
    if (current_s_time_str.length <= 1) current_s_time_str = '0' + current_s_time_str
    return `${current_m_time_str}:${current_s_time_str} / ${all_m_time_str}:${all_s_time_str}`

}
// 获取时间
function get_progress_num(){
    return current_time/all_time
}
// 从网络更新时间
function up_time(){
    const json_data = getData(data_name, null)
    if (!json_data) return
    const dict_data = JSON.parse(json_data)
    all_time = dict_data.duration
    current_time = all_time - dict_data.remaining
}
// 统一更新时间和进度
function change_all() {
    change_progress_doc(get_progress_num())
    change_time_doc(get_time_str())
}
// 定时更新使用函数
function timer_fuc(){
    if (current_time < all_time) current_time ++
    change_all()
}
// 初始化
function up_time_progess(){
    up_time()
    change_all()
    onChangeMusicData(up_time)
    return setInterval(timer_fuc, 1000)
}
export default up_time_progess