$(document).ready(function(){
    setTimeout(function(){ document.getElementById('promo').style.display = "none";document.getElementById('editor').style.display = "block";}, 2000);
    $("#autoscrol").change(function(){
      alert("The text has been changed.");
    });
    if(paths2["lastfolder"] != ''){
        addfoldertoexplorer(paths2["lastfolder"])
    }
    $('.ace_scrollbar-h').height(13)
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
function removetab(){
    var id= document.querySelector("#activexp").parentNode.parentNode.id;
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
    document.getElementById(id).innerHTML = '';
    fileTabCount = 0;
    editor.setValue('');
    fs.writeFile(pathslocation,JSON.stringify(clear),(err)=>{
        if (err) return console.log(err);
    })
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
    main.openwindowS('')
})