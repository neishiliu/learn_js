/**
 * Created by Administrator on 2016/5/7.
 */
//������ݼ��嵥����
function displayAccessKeys(){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //ȡ���ĵ�����������
    var links = document.getElementsByTagName("a");
    //����һ�����鱣����ʼ�
    var akeys = new Array();
    //������������
    for (var i=0; i<links.length; i++){
        var current = links[i];
        //���û��accesskey���ԣ��жϺ�����룬������һ��ѭ��
        if (!current.getAttribute("accesskey")) continue;
        //ȡ��accesskey��ֵ
        var key = current.getAttribute("accesskey");
        //ȡ�������ı�
        var links_text = current.lastChild.nodeValue;
        //��ӵ�����
        akeys[key] = links_text;
    }
    //�����б�
    var list = document.createElement("ul");
    //�������ʼ�
    for (key in akeys){
        var link_text = akeys[key];
        //�����ŵ��б����е��ַ���
        var str = key + ": "+link_text;
        //�����б���
        var list_li = document.createElement("li");
        var list_li_text = document.createTextNode(str);
        list_li.appendChild(list_li_text);
        //���б�����ӵ��б���
        list.appendChild(list_li);
    }
    //��������
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Accesskeys");
    header.appendChild(header_text);
    //�ѱ���ŵ�ҳ������
    document.body.appendChild(header);
    //���б�ŵ�ҳ������
    document.body.appendChild(list);
}
addLoadEvent(displayAccessKeys);