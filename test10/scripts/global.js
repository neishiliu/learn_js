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

//根据指定id显示相应section同时隐藏其他部分
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i=0;i<sections.length;i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}
//将nav中的连接与相应id联结起来
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i=0;i<links.length;i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1]; //获取href中“#”后面部分字符串
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination =  sectionId;
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

//替换图片函数
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src",source);
    if (document.getElementById("description")){
        var text=whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description=document.getElementById("description");
        if (description.firstChild.nodeType == 3){
            description.firstChild.nodeValue=text;
        }
    }
    return true;
}
//创建p元素和img元素
function preparePlaceholder(){
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
addLoadEvent(preparePlaceholder);
//点击替换图片函数
function prepareGallery(){
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return showPic(this) ? false : true;
        }
    }
}
addLoadEvent(prepareGallery);