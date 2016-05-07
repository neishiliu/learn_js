/**
 * Created by Administrator on 2016/5/7.
 */
//创建快捷键清单函数
function displayAccessKeys(){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //取得文档中所有连接
    var links = document.getElementsByTagName("a");
    //创建一个数组保存访问键
    var akeys = new Array();
    //遍历所有连接
    for (var i=0; i<links.length; i++){
        var current = links[i];
        //如果没有accesskey属性，中断后面代码，继续下一个循环
        if (!current.getAttribute("accesskey")) continue;
        //取得accesskey的值
        var key = current.getAttribute("accesskey");
        //取得连接文本
        var links_text = current.lastChild.nodeValue;
        //添加到数组
        akeys[key] = links_text;
    }
    //创建列表
    var list = document.createElement("ul");
    //遍历访问键
    for (key in akeys){
        var link_text = akeys[key];
        //创建放到列表项中的字符串
        var str = key + ": "+link_text;
        //创建列表项
        var list_li = document.createElement("li");
        var list_li_text = document.createTextNode(str);
        list_li.appendChild(list_li_text);
        //把列表项添加到列表中
        list.appendChild(list_li);
    }
    //创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Accesskeys");
    header.appendChild(header_text);
    //把标题放到页面主体
    document.body.appendChild(header);
    //把列表放到页面主体
    document.body.appendChild(list);
}
addLoadEvent(displayAccessKeys);