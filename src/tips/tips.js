// 消息管理器
class MMg {
    // 储存消息列表
    constructor() {
        this.message_list = []
        this.is_work = false
    }
    // 添加消息
    add(message) {
        this.message_list.push(message)
        this.show()
    }
    // 消耗消息
    async show() {
        if (this.is_work) return
        if (this.message_list.length === 0) return
        this.is_work = true
        const message = this.message_list.shift()
        try {
            await this.create_tips(message)
        }catch (e) {} finally {
            this.is_work = false
            await this.sleep(10)
            return this.show()
        }
    }
    async sleep(ms) {
        return new Promise(resolve => { setTimeout(resolve, ms) })
    }
    // 创建消息
    async create_tips(msg, show_time = 875) {
        document.querySelectorAll('#tip_box').forEach(e => e.remove())
        const cat_box = document.createElement('cat_box')
        document.body.appendChild(cat_box)
        const tips = document.querySelector('cat_box')
        tips.outerHTML = '<div id="tip_box" style="bottom: -100px;">' + msg + '</div>'
        // 多等等, 过快会导致不正常
        await this.sleep(100)
        document.querySelector('#tip_box').setAttribute('style', '')
        await this.sleep(500 + show_time)
        await this.delete_tips()
    }
    // 删除消息
    async delete_tips() {
        const all_tips = document.querySelectorAll('#tip_box')
        all_tips.forEach(e => {
            e.setAttribute('style', 'background-color:rgba(28, 28, 28, 0);color:rgba(28, 28, 28, 0)')
        })
        await this.sleep(500)
        all_tips.forEach(e => e.remove())
    }
}
let mmg;
function tips(msg) {
    mmg.add(msg)
}
// 初始化消息管理
export default function init_mmg() {
    mmg = new MMg()
    window.tips = tips
}