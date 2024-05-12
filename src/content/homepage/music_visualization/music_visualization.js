let audioEle = document.querySelector('audio');
let cvs = document.querySelector('canvas')
let ctx = cvs.getContext('2d');
let isInit = false;
let dataArray, analyser;
// 拿到实时数据在Canvas上按规则画出
function draw() {
    requestAnimationFrame(draw);
    const { width, height } = cvs
    ctx.clearRect(0, 0, width, height);
    // 让分析器节点分析数据到数组中;
    if (!isInit) return;
    analyser.getByteFrequencyData(dataArray);
    const len = dataArray.length / 3;
    const barWidth = width / len / 2;
    ctx.fillStyle = '#78c5f7'
    for (let i = 0; i < len; i++) {
        let data = dataArray[i] // <=  256
        const barHeight = data / 255 * height;
        // 不会对称的
        // const x = i * barWidth;
        // 对称的
        const x1 = i * barWidth + width / 2;
        const x2 = width / 2 - (i + 1) * barWidth;
        // 不会对称的
        const y = height - barHeight;

        // 对称的
        ctx.fillRect(x1, y, barWidth - 2, barHeight)
        ctx.fillRect(x2, y, barWidth - 2, barHeight)

        // 不会对称的
        // ctx.fillRect(x, y, barWidth, barHeight)
    }
}
// audionpaly 回调函数
function audioPlay() {
    console.log('audioPlay')
    if (isInit) return;
    // 创建音频对象
    const audCtx = new AudioContext(); //创建音视频上下文
    // 创建一个音频源节点(音频处理的环节 比如修音 加入混响 音量调高调低) 来源来自于一个元素 音频元素
    const source = audCtx.createMediaElementSource(audioEle);
    // 创建AnalyserNode节点
    analyser = audCtx.createAnalyser() // 分析器
    analyser.fftSize = 512; // 变换的窗口大小越大越细腻 默认值2048 必须是2的N次幂；
    // 创建一个数组 接收分析器节点的分析数据;
    dataArray = new Uint8Array(analyser.frequencyBinCount) // 512 / 2
    source.connect(analyser); // 连接
    analyser.connect(audCtx.destination) // 输出
    isInit = true
}
// 初始化
function init_vis() {
    audioEle = document.querySelector('audio');
    cvs = document.querySelector('canvas')
    ctx = cvs.getContext('2d');
    isInit = false;
    audioEle.onplay = audioPlay
    draw()
}
export default init_vis