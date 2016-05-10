/**
 * Created by Administrator on 2016/5/10.
 */
function insertAfter(newElement,tragetElement){
    var parent = tragetElement.parentNode;
    if (parent.lastChild == tragetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,tragetElement.nextSibling);
    }
}