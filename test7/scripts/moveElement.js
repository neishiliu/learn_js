/**
 * Created by Administrator on 2016/5/10.
 */
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