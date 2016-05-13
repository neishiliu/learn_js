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

//更改单双行表格行背景色
function stripeTables(){
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i=0;i<tables.length;i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j=0;j<rows.length;j++){
            if (odd == true){
                addClass(rows[j],"odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
addLoadEvent(stripeTables);
//鼠标hover时高亮表格行
function highlightRows(){
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0;i<rows.length;i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this,"highlight");
        };
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}
addLoadEvent(highlightRows);
//显示缩略语函数
function displayAbbreviations(){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    //遍历这些缩略词
    for (var i=0; i<abbreviations.length; i++){
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //创建定义列表
    var dlist = document.createElement("dl");
    //遍历定义
    for (key in defs) {
        var definition = defs[key];
        //创建定义标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    //创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    //获取article元素
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    //把标题添加到article元素后
    container.appendChild(header);
    //把定义列表添加到article元素后
    container.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);