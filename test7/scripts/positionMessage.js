/**
 * Created by Administrator on 2016/5/9.
 */
function positionMessage(){
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    moveElement("message",500,100,10);
}
addLoadEvent(positionMessage);
