/**
 * Created by Administrator on 2016/5/10.
 */
function prepareSlideshow(){
    //确保浏览器支持DOM方法
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    //确保元素存在
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
    //取得列表中所有连接
    var links = list.getElementsByTagName("a");
    //为mouseover事件添加动画效果
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