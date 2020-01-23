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
document.getElementById('editor').style.fontSize=defauntfontsize+'px';
editor.session.setTabSize(defaunttabsize);

function editorconfigsetting(){
  var dfs=document.getElementById('defaultinputsize').value;
  var nfs = document.getElementById('newfontsize').value;
  var thm = document.getElementById('defaulttheme').value;
  var dts = document.getElementById('defaulttab').value;
  paths2["fontsize"]=nfs;
  paths2["default_tabsize"]=dts;
  paths2["default_fontsize"]=dfs;
  paths2["default_theme"]=thm;
  editor.setTheme("ace/theme/"+thm);
  fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
      if (err) return console.log(err);
    });
  if (nfs != undefined || !(nfs < 1)){
    document.getElementById('editor').style.fontSize=nfs+'px';
  }
  else {
    document.getElementById('editor').style.fontSize=dfs+'px';
  }
  editor.session.setTabSize(dts);

}
