/**
 * Created by Administrator on 2016/5/11.
 */
//window.onload加载多个函数的函数
function addLoadEvent(func){
    var oldonload=window.onload;
    if (typeof window.onload != 'function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

//在元素后插入其他元素的函数
function insertAfter(newElement,tragetElement){
    var parent = tragetElement.parentNode;
    if (parent.lastChild == tragetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,tragetElement.nextSibling);
    }
}

//增加class函数
function addClass(element,value){
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}

//导航当前页面链接高亮函数
function heighlightPage(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var header = document.getElementsByTagName("header");
    if (header.length == 0) return false;
    var navs = header[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (i=0;i<links.length;i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(heighlightPage);

//移动元素函数
function moveElement(elementID,final_x,final_y,interval){
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left){
        elem.style.left = "0px";
    }
    if (!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y){
        return true;
    }
    if (xpos<final_x){
        xpos=xpos+Math.ceil((final_x-xpos)/10);
    }
    if (xpos>final_x){
        xpos=xpos-Math.ceil((xpos-final_x)/10);
    }
    if (ypos<final_y){
        ypos=ypos+Math.ceil((final_y-ypos)/10);
    }
    if (ypos>final_y){
        ypos=ypos-Math.ceil((ypos-final_y)/10);
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")" ;
    elem.movement = setTimeout(repeat,interval);
}

//创建幻灯片函数
function prepareSlideshow(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt"," ");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","zhe shi yi ge tu pian!");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    var destination;
    for (var i=0;i<links.length;i++) {
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1){
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1){
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1){
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1){
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);