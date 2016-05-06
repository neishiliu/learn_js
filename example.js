// window.onload=function(){
// 	var textdiv=document.getElementById("testdiv");
// 	testdiv.innerHTML="<p>i inserted <em>this</em> content.</p>";
// }
// window.onload=function(){
// 	var para=document.createElement("p");
// 	var info="node name: ";
// 	info+=para.nodeName;
// 	info+=" node type: ";
// 	info+=para.nodeType;
// 	alert (info);
// }
var para=document.createElement("p");
var testdiv=document.getElementById("testdiv");
testdiv.appendChild(para);
var txt=document.createTextNode("hello world");
para.appendChild(txt);