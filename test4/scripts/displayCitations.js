/**
 * Created by Administrator on 2016/5/7.
 */
//����������Դ���Ӻ���
function displayCitations(){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //ȡ����������
    var quotes = document.getElementsByTagName("blockquote");
    //��������
    for (var i=0;i<quotes.length;i++){
        //���û��cite���ԣ��жϺ�����䣬������һ��ѭ��
        if (!quotes[i].getAttribute("cite")) continue;
        //����cite����
        var url = quotes[i].getAttribute("cite");
        //ȡ�������е�����Ԫ�ؽڵ�
        var quoteChildren = quotes[i].getElementsByTagName("*");
        //���û��Ԫ�ؽڵ㣬�жϺ�����䣬������һ��ѭ��
        if (quoteChildren.length < 1) continue;
        //ȡ�������е����һ���ڵ�
        var elem = quoteChildren[quoteChildren.length - 1];
        //�������
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href",url);
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        //�ѱ����ӵ������е����һ��Ԫ�ؽڵ�
        elem.appendChild(superscript);
    }
}
addLoadEvent(displayCitations);