/**
 * Created by Administrator on 2016/5/10.
 */
function prepareSlideshow(){
    //ȷ�������֧��DOM����
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    //ȷ��Ԫ�ش���
    if (!document.getElementById("linklist")) return false;
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src","img.gif");
    preview.setAttribute("alt","img");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist");
    insertAfter(slideshow,list);
    //ȡ���б�����������
    var links = list.getElementsByTagName("a");
    //Ϊmouseover�¼���Ӷ���Ч��
    links[0].onmouseover = function() {
        moveElement("preview",-100,0,10);
    };
    links[1].onmouseover = function(){
        moveElement("preview",-200,0,10);
    };
    links[2].onmouseover = function(){
        moveElement("preview",-300,0,10);
    }
}
addLoadEvent(prepareSlideshow);