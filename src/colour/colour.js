import ColorThief from 'colorthief'
// const onChangeMusicData = window.electron.onChangeMusicData
// const getData = window.electron.getData
// const data_name = 'song_data'
const colorThief = new ColorThief()
// 获取颜色
async function get_main_color(img) {
    const color = colorThief.getColor(img)
    return await color
}
// 获取颜色分布
async function get_color_distribution(img) {
    const color_distribution = colorThief.getPalette(img)
    return await color_distribution
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
    if (mode == 'max') min_distance = 0
    for (const c of color_list){
        const distance = calculate_color_distance(color, c)
        if ( mode== 'min' && distance < min_distance) {
            min_distance = distance
            good_color = c
        }
        else if ( mode== 'max' && distance > min_distance) {
            min_distance = distance
            good_color = c
        }
    }
    return good_color
}
// 设置背景图片
function set_background_image() {
    const body = document.querySelector('#background')
    const img_url = document.getElementById('cover_img').src
    body.style.backgroundImage = 'url(' + img_url + ')'
}
// 获取合适的文字颜色
function get_good_text_color(tc, fc) {
    const distance = calculate_color_distance(tc, fc)
    let good_color = fc
    if (distance < 150) {
        good_color = fc.map(x => 255 - x)
    }
    return good_color
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
    information.style.color = 'rgb('+ ex_fc.join(', ') +')'
    set_background_image()
}
// 图片加载回调函数
async function img_load_callback() {
    const img = document.getElementById('cover_img')
    let main_color = await get_main_color(img)
    let color_distribution = await get_color_distribution(img)
    const approximate_color = get_ac_color(main_color, color_distribution)
    const comparison_color = get_ac_color(main_color, color_distribution, 'max')
    change_subject_color(main_color, main_color, main_color, approximate_color, comparison_color)
}
// 初始化主题色
export default function init_color() {
    const img = document.getElementById('cover_img')
    img.addEventListener('load', img_load_callback)
}