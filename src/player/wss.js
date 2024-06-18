const saveData = window.electron.saveData
const getData = window.electron.getData
const changeMusicData = window.electron.changeMusicData
const url = 'wss://gensokyoradio.net/wss'
const data_name = 'song_data'
let wss = null
let id = null
// 启动连接
function start() {
    wss = new WebSocket(url)
    wss.onopen = onopen_callback
    wss.onmessage = onmessage_callback
    wss.onclose = close
}
// 启动函数回调函数
function onopen_callback() {
    console.log('连接开始')
    wss.send('{"message":"grInitialConnection"}')
}
// 数据改变回调函数
function onmessage_callback(event) {
    const json_data = event.data
    console.log('接收到数据', json_data)
    const dict_data = JSON.parse(json_data)
    if (dict_data.message === 'welcome') {
        id = dict_data.id
    } else if (dict_data.message === 'ping') {
        wss.send('{"message":"pong", "id":' + id + '}')
    } else {
        save(dict_data)
    }
}
// 关闭连接
function close() {
    console.log('连接关闭')
    // wss.close()
    start()
}
// 保存数据
async function save(dict_data) {
    const loc_data = JSON.parse(getData(data_name, null))
    dict_data.img = loc_data?.img
    let json_data = JSON.stringify(dict_data)
    // 先更新除图片外的数据
    saveData(data_name, json_data)
    console.log('基础数据已保存')
    send_change()
     // 判断是否已经保存过
    if (loc_data?.songid === dict_data.songid) return
    // 获取图片base64后保存
    const img = await img_to_base64(dict_data.albumart)
    if (!img) return
    dict_data.img = img
    json_data = JSON.stringify(dict_data)
    saveData(data_name, json_data)
    console.log('包含图片的完整数据已保存')
    // 发送数据改变通知
    send_change()
}
// 通知主进程数据改变
function send_change() {
    changeMusicData()
}
// 将网络图片转为base64保存
async function img_to_base64(img_url) {
    const max_try = 5
    const img = await get(img_url, max_try)
    if (!img) return null
    console.log('图片已下载', img_url)
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(img);
    });
}
// 获取网络图片
async function get(url, _num=5) {
    try{
        console.log('尝试下载图片', url)
        if (_num <= 0) return null
        const response = await fetch(url)
        if (!response.ok) return get(url, _num-1)
        const data = await response.blob()
        return data
    }catch(err) {
        return get(url, _num-1)
    }
}
export default start