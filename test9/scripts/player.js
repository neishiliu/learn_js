/**
 * Created by Administrator on 2016/5/11.
 */
function createVideoControls() {
    //获取所有video元素
    var vids = document.getElementsByTagName("video");
    //遍历video元素并附给“添加控件”函数
    for (var i=0;i<vids.length;i++) {
        addControls( vids[i] );
    }
}

function addControls(vid) {
    //取消原有控件样式
    vid.removeAttribute("controls");
    //为video父元素设置宽高
    vid.height = vid.videoHeight;
    vid.width = vid.videoWidth;
    vid.parentNode.style.height = vid.height + "px";
    vid.parentNode.style.width = vid.width + "px";
    //创建控件元素
    var controls = document.createElement("div");
    controls.setAttribute("class","controls");
    var play = document.createElement("button");
    play.setAttribute("title","Play");
    play.innerHTML = "&#x25BA;"; //插入播放的三角符号
    //把控件插入video前面
    controls.appendChild(play);
    vid.parentNode.insertBefore(controls,vid);
    //给play添加click事件
    play.onclick = function() {
        if (vid.ended) {
            vid.currentTime = 0;
        }
        if (vid.paused) {
            vid.play();
        } else {
            vid.pause();
        }
    };
    //利用play、pause和ended事件修改play按钮状态
    vid.addEventListener("play",function(){
        play.innerHTML = "&#x2590;&#x2590;";
        play.setAttribute("paused",true);
    },false);
    vid.addEventListener("pause",function(){
        play.removeAttribute("paused");
        play.innerHTML = "&#x25BA;";
    },false);
    vid.addEventListener("ended",function(){
        vid.pause();
    },false);
}

window.onload = function () {
    createVideoControls();
};