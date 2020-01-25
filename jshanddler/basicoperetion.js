$(document).ready(function(){
    setTimeout(function(){ document.getElementById('promo').style.display = "none";document.getElementById('editor').style.display = "block";}, 2000);
    $("#autoscrol").change(function(){
      alert("The text has been changed.");
    });
    if(paths2["lastfolder"] != ''){
        addfoldertoexplorer(paths2["lastfolder"])
    }
    $('.ace_scrollbar-h').height(13)
    document.getElementById('defaultinputsize').value=paths2["default_fontsize"];
  });
  if(paths2["win_state"] == 1){
    remote.getCurrentWindow().maximize();
  }


function hideopedfiles(x){
    if(x==0){
        if($('#autoscrol').is(':visible'))
        {
            $('#autoscrol').hide();
        }
        else{
            $('#autoscrol').show();
        }
    }
    else{
        if($('#autoscroll').is(':visible'))
        {
            $('#autoscroll').hide();
        }
        else{
            $('#autoscroll').show();
        }
    }
}
var pathslocation = './jshanddler/paths.json';
//var paths = require(pathslocation);
function removealltab(){
  document.getElementById('autoscrol').innerHTML = '';
  fileTabCount = 0;
  editor.setValue('');
  fs.writeFile(pathslocation,JSON.stringify(clear),(err)=>{
      if (err) return console.log(err);
  })
}
function removetab(){
    var id= document.querySelector("#activexp").parentNode;
    document.getElementById('autoscrol').removeChild(id);
    if (!document.getElementById('autoscrol').firstElementChild){
      fileTabCount = 0;
    }
    else {
      document.getElementById('autoscrol').firstElementChild.firstElementChild.setAttribute("id", "activexp");
      if (paths[document.getElementById('autoscrol').firstElementChild.id] != ''){
          fs.readFile(paths[document.getElementById('autoscrol').firstElementChild.id],(err, data) => {
              if (err) throw err;
              editor.setValue(data.toString());
              var fileName = document.getElementById('autoscrol').firstElementChild.firstElementChild.innerHTML;
              var filetype = fileName.split('.').pop();
              var typeext = ['cpp','cs','css','dart','json','html','java','js','kt','m','php','py','rb']
              var typefile = ['c_cpp','csharp','css','dart','hjson','html','java','javascript','kotlin','objectivec','php','python','ruby']
              var indext = typeext.indexOf(filetype);
              filetype = typefile[indext];
              editor.session.setMode("ace/mode/"+filetype);

          });
      }
      else{editor.setValue('');}
    }
    //var uid = id.split('_').pop();
    //console.log(id,uid && paths[upid]!='')
    //var upid=uid-1;
    /*if (uid != 1 && paths[upid]){
        upid = "codeslate_"+upid;
        fs.readFile(paths[upid],(err, data) => {
            if (err) throw err;
            editor.setValue(data.toString());

        });
        $("#"+upid+":nth-child(2)").attr('id', 'activexp');

    }*/
    //$("#"+upid+":nth-child(2)").attr('id', 'activexp');
    //$('#'+id).child().remove();


    /*
    document.getElementById(id).innerHTML = '';
    fileTabCount = 0;
    editor.setValue('');
    fs.writeFile(pathslocation,JSON.stringify(clear),(err)=>{
        if (err) return console.log(err);
    })*/
}
function hidesidepanel(){
    if($('#resizable').width()==245)
    {
        $("#resizable").animate({width: '0px'});
    }
    else{
        $("#resizable").animate({width: '245px'});
    }
}
var previouskey = 'Control'
document.querySelector('#editor').addEventListener('keyup', function (e) {
    if(document.getElementById('autoscrol').firstElementChild && ((previouskey+"+"+ e.key) != 'Control+s' || (previouskey+"+"+ e.key) != 'Control+n') && e.key != 'Control' && ((e.key+"+"+ previouskey) != 's+Control' || (e.key+"+"+ previouskey) != 'n+Control')){
    document.getElementById('filenotsaved').style.display = "block";
    document.getElementById('lastletter').innerHTML= e.key;}
})
var fontsi = defauntfontsize
document.getElementById('decreasefontlabel').addEventListener('click',()=>{
    if(paths2["fontsize"] == 0){
        fontsi-=1;
        paths2["fontsize"]= fontsi-1;
        document.getElementById('editor').style.fontSize=fontsi+'px';
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
    else if(paths2["fontsize"] != 1){
        paths2["fontsize"]= paths2["fontsize"]-1;
        document.getElementById('editor').style.fontSize=paths2["fontsize"]+'px';
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
})
var fontsi2 = defauntfontsize
document.getElementById('increasefontlabel').addEventListener('click',()=>{
    if(paths2["fontsize"] == 0){
        fontsi2+=1;
        paths2["fontsize"]= fontsi2-1;
        document.getElementById('editor').style.fontSize=fontsi2+'px';
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
    else{
        paths2["fontsize"]= paths2["fontsize"]+1;
        document.getElementById('editor').style.fontSize=paths2["fontsize"]+'px';
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
})
const main = remote.require('./main.js')
document.getElementById('settingsbtnlabel').addEventListener('click',()=>{
    document.getElementById('settings').style.display="block";
})
document.getElementById('shortcutbtnlabel').addEventListener('click',()=>{
    settings('shortcut1')
})
document.getElementById('themebtnlabel').addEventListener('click',()=>{
    settings('theme1')
})
function opensetting(){
  document.getElementById('settings').style.display="block";
}
document.getElementById('closesetting').addEventListener('click',()=>{
    document.getElementById('settings').style.display="none";
})
document.getElementById('fontsize').addEventListener('click',()=>{
    document.getElementById('fontsize1').style.display="block";
    document.getElementById('theme1').style.display="none";
    document.getElementById('shortcut1').style.display="none";
    document.getElementById('update1').style.display="none";
})
document.getElementById('theme').addEventListener('click',()=>{
    document.getElementById('fontsize1').style.display="none";
    document.getElementById('theme1').style.display="block";
    document.getElementById('shortcut1').style.display="none";
    document.getElementById('update1').style.display="none";
})
document.getElementById('shortcut').addEventListener('click',()=>{
    document.getElementById('fontsize1').style.display="none";
    document.getElementById('theme1').style.display="none";
    document.getElementById('shortcut1').style.display="block";
    document.getElementById('update1').style.display="none";
})
document.getElementById('update').addEventListener('click',()=>{
    document.getElementById('fontsize1').style.display="none";
    document.getElementById('theme1').style.display="none";
    document.getElementById('shortcut1').style.display="none";
    document.getElementById('update1').style.display="block";
})
var list = ['fontsize1','theme1','shortcut1','update1']
function settings(feature){

  var i;
for (i = 0; i < 4; i++) {
  document.getElementById(list[i]).style.display="none";
}
document.getElementById(feature).style.display="block";
document.getElementById('settings').style.display="block";
}
var si=paths2["default_fontsize"];
document.getElementById('plus').addEventListener('click',()=>{
  si+=1;
  document.getElementById('newfontsize').value=si;
})
document.getElementById('minus').addEventListener('click',()=>{
  si-=1;
  document.getElementById('newfontsize').value=si;
})
document.getElementById('defaulttheme').value=paths2['default_theme'];
document.getElementById('defaulttab').value=paths2['default_tabsize'];
