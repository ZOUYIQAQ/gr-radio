import './login.scss'
function CreateLogin() {
    return(
        <div id='login_box'>
            <div id='headers'>
                <p>Login</p>
            </div>
            <div id='login_form'>
                <div>
                    <input></input>
                    <input></input>
                </div>
            </div>
            <div id='login_button'>
                <div id='login_button_left'>
                    <button id='login_button_left_login'>登录</button>
                    <button>取消</button>
                </div>
                <div id='login_button_right'>
                    <button>注册</button>
                </div>
            </div>
        </div>
    )
}