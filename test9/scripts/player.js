/**
 * Created by Administrator on 2016/5/11.
 */
function createVideoControls() {
    //��ȡ����videoԪ��
    var vids = document.getElementsByTagName("video");
    //����videoԪ�ز���������ӿؼ�������
    for (var i=0;i<vids.length;i++) {
        addControls( vids[i] );
    }
}

function addControls(vid) {
    //ȡ��ԭ�пؼ���ʽ
    vid.removeAttribute("controls");
    //Ϊvideo��Ԫ�����ÿ��
    vid.height = vid.videoHeight;
    vid.width = vid.videoWidth;
    vid.parentNode.style.height = vid.height + "px";
    vid.parentNode.style.width = vid.width + "px";
    //�����ؼ�Ԫ��
    var controls = document.createElement("div");
    controls.setAttribute("class","controls");
    var play = document.createElement("button");
    play.setAttribute("title","Play");
    play.innerHTML = "&#x25BA;"; //���벥�ŵ����Ƿ���
    //�ѿؼ�����videoǰ��
    controls.appendChild(play);
    vid.parentNode.insertBefore(controls,vid);
    //��play���click�¼�
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
    //����play��pause��ended�¼��޸�play��ť״̬
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