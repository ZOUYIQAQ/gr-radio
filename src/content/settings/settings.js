import './settings.css'
function SettingsPage() {
    return (
        <div id='settings'>
            <div id='setting_list'>
                <div className='setting_item' id='about'>
                    <img src='img/icons8-关于-100.png'  alt='' className='setting_icon'></img>
                    <div className='setting_text'>关于此应用</div>
                </div>
            </div>
        </div>
    )
}
export default SettingsPage