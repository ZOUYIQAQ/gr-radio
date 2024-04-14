import './content.css'
import ToolModule from './tools_list/tools_list'
import Homepage from './homepage/homepage'
// 内容
function Content() {
    return (
        <div id="content">
            <ToolModule />
            <Homepage />
        </div>
    )
}
export default Content