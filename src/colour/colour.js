import ColorThief from 'colorthief'
const getData = window.electron.getData
const saveData = window.electron.saveData
const song_data_name = 'song_data'
const color_data_name = 'color_data'
const colorThief = new ColorThief()
// 从base64图片生成图片
function create_image(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (base64 && img) img.src = base64;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      })
}
// 获取颜色
async function get_main_color(base64) {
    const img = await create_image(base64)
    const color = await colorThief.getColor(img)
    return color
}
// 获取颜色分布
async function get_color_distribution(base64) {
    const img = await create_image(base64)
    const color_distribution = await colorThief.getPalette(img)
    return color_distribution
}
// 计算颜色的欧式距离
function calculate_color_distance(color1, color2) {
    let distance = 0
    for (let i = 0; i < color1.length; i++) {
        distance += Math.pow(color1[i] - color2[i], 2)
    }
    distance = Math.sqrt(distance)
    return distance
}
// 获取近似色
function get_ac_color(color, color_list, mode='min') {
    let good_color = color
    let min_distance = 99999
    if (mode === 'max') min_distance = 0
    for (const c of color_list){
        const distance = calculate_color_distance(color, c)
        if ( mode=== 'min' && distance < min_distance) {
            min_distance = distance
            good_color = c
        }
        else if ( mode=== 'max' && distance > min_distance) {
            min_distance = distance
            good_color = c
        }
    }
    return good_color
}
// 设置背景图片
function set_background_image() {
    const body = document.querySelector('#background')
    let img_url = JSON.parse(getData(song_data_name))?.img
    img_url = img_url ? img_url : document.querySelector('#cover_img')?.src
    body.style.backgroundImage = 'url(' + img_url + ')'
}
// 获取合适的文字颜色
function get_good_text_color(tc, fc, k=0.5) {
    const distance = calculate_color_distance(tc, fc)
    // 计算差距颜色
    const cc = [tc[0]-fc[0], tc[1]-fc[1], tc[2]-fc[2]].map(key => key*k)
    if (distance < 50) return [tc[0]+cc[0], tc[1]+cc[1], tc[2]+cc[2]].map(key=>Math.min(key, 255)).map(key=>Math.max(key, 0))
    return fc
}
// 改变主题色
function change_subject_color(t_c, ht_c, h_c, p_c, f_c) {
    let ex_fc = f_c
    const tool_list = document.querySelector('#tool_list')
    const hidden_tools_button_div = document.querySelector('#hidden_tools_button_div')
    const headers = document.querySelector('#headers')
    const progress = document.querySelector('#progress')
    const information = document.querySelector('#information')
    tool_list.style.backgroundColor = 'rgb('+ t_c.join(', ') + ', 0.5' +')'
    hidden_tools_button_div.style.backgroundColor = 'rgb('+ ht_c.join(', ') + ', 0.5' +')'
    headers.style.backgroundColor = 'rgb('+ h_c.join(', ') + ', 0.5' +')'
    progress.style.backgroundColor = 'rgb('+ p_c.join(', ') +')'
    tool_list.style.color = 'rgb('+ ex_fc.join(', ') +')'
    hidden_tools_button_div.style.color = 'rgb('+ ex_fc.join(', ') +')'
    if (information) information.style.color = 'rgb('+ ex_fc.join(', ') +')'
    set_background_image()
}
// 图片加载回调函数
export async function img_load_callback() {
    const data = await getData(song_data_name)
    if (!JSON.parse(data)?.img) return
    const base64 = JSON.parse(data).img
    let main_color = await get_main_color(base64)
    let color_distribution = await get_color_distribution(base64)
    const approximate_color = get_ac_color(main_color, color_distribution)
    const comparison_color = get_ac_color(main_color, color_distribution, 'max')
    change_subject_color(main_color, main_color, main_color, approximate_color, comparison_color)
    // 设置音乐可视化颜色
    window?.spg?.set_rgba(...main_color.map(x => Math.min(x + 20, 255)), 0.5)
    saveData(color_data_name, JSON.stringify(main_color))
}
// 初始化主题色
export function init_color() {
    const img = document.getElementById('cover_img')
    img?.addEventListener('load', img_load_callback)
}