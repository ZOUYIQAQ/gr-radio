<div align="center">

# Gr Radio

</div>

## 目录

- [Gr Radio](#gr-radio)
  - [目录](#目录)
  - [预览](#预览)
  - [简介](#简介)
  - [下载](#下载)
  - [友情提示](#友情提示)
  - [构建](#构建)
  - [鸣谢](#鸣谢)

## 预览

<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/主页.png?raw=true' alt=''>
<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/未播放.png?raw=true' alt=''>
<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/专辑.png?raw=true' alt=''>
<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/新闻.png?raw=true' alt=''>
<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/评论.png?raw=true' alt=''>
<img src='https://github.com/ZOUYIQAQ/gr-radio/blob/main/introduce/设置.png?raw=true' alt=''>

## 简介

使用react+electron构建的gr radio的第三方桌面程序, 并不是官方应用.

想要收听gr radio但是又不想打开网页, 那么就手动写一个吧. 于是就有了这个项目.

因为我只有windos的设备, 所以也只编译了window端的应用, 如果有其他需求还请自行修改配置文件后编译.

## 下载

在这里下载[发行版](https://github.com/ZOUYIQAQ/gr-radio/releases/latest)

## 友情提示

- 在应用刚启动时立刻评分提示未登录是因为每次应用启动都会重新登录和获取收藏, 这需要一点时间. 后续如果有时间我会改进这一点.
- 在评分时提示电台未连接, 但音乐已经在播放了. 这可能是因为服务端尚未反应过来, 几秒后再次评分即正常. 这种情况一般出现在音乐刚开始播放就进行评分上. 

## 构建

1. 首先使用git克隆本仓库到本地并进入对应文件夹

    ```cmd
    git clone https://github.com/ZOUYIQAQ/gr-radio.git
    cd gr-radio
    ```

2. 使用npm安装依赖

    ```cmd
    npm install
    ```

3. 构建react文件

    ```cmd
    npm run build
    ```

4. 直接运行或构建应用程序后运行
    - 直接运行

        ```cmd
        npm run electron
        ```

    - 构建应用程序

        ```cmd
        npm run dist
        ```

## 鸣谢

- [gr radio](https://gensokyoradio.net/)
- [igoutu](https://igoutu.cn/icons)