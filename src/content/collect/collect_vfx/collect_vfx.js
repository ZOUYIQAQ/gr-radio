// 计算当前合适的每行个数
export function get_row_count() {
    const collect_page = document.querySelector('#collect_page')
    const width = collect_page.offsetWidth
    return parseInt((1.03 * width) / (330 + 0.03 * width)) 
}
// 初始化页面动效
export function init_row_count() {
    window.addEventListener('resize', () => {
        const collect_page = document.querySelector('#collect_page')
        if (window.location.pathname !== '/collect') return
        const rowCount = get_row_count()
        collect_page.style['grid-template-columns'] = `repeat(${rowCount}, auto)`
    })
}