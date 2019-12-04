var editor = ace.edit("editor");
if(paths2["fontsize"] != 0){
    var defauntfontsize = paths2["fontsize"]
}
else{
    var defauntfontsize = paths2["default_fontsize"]
}
if(paths2["tabsize"] != 0){
    var defaunttabsize = paths2["tabsize"]
}
else{
    var defaunttabsize = paths2["default_tabsize"]
}
if(paths2["theme"] != ""){
    editor.setTheme("ace/theme/"+paths2["theme"]);
}
else{
    editor.setTheme("ace/theme/"+paths2["default_theme"]);
}
editor.session.setMode("ace/mode/python");
document.getElementById('editor').style.fontSize=defauntfontsize+'px';
editor.session.setTabSize(defaunttabsize);