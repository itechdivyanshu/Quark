const {dialog} = require('electron').remote;
const fs = require('fs');

var fileTabCount = 0;
var pathslocation = './jshanddler/paths.json';
var pathslocation2 = './jshanddler/fixedpart.json';
var paths = require(pathslocation);
var paths2 = require(pathslocation2);
var clear = {

};
fs.writeFile(pathslocation,JSON.stringify(clear),(err)=>{
    if (err) return console.log(err);
})
function createNewFile(withaddress,address) {
    if(!withaddress){
        addNewExplorerTabInFilesConitainer(0,'');
        //openCodeSlate(fileTabCount);
        //hidepreviouseditor(openedTabs);
    }
    else{
        addNewExplorerTabInFilesConitainer(1,address);
    }
    console.log(document.getElementById('autoscrol').firstElementChild)
}

function addNewExplorerTabInFilesConitainer(withaddress,address){
    if(!withaddress){
        fileTabCount++;

        editorId = "codeslate_" +fileTabCount;
        var fileName = "Untitled - " + fileTabCount;

        if(fileTabCount != 1){
            var removeactive = document.querySelector("#activexp");
            removeactive.setAttribute("id","");
        }
        $(".filesContainer").append(" <li id='"+editorId+"'><label id='activexp' for='"+editorId+"' class='fileNameSpan'>"+fileName+"</label> </li> ");
        var elem = document.getElementById('autoscrol');
        elem.scrollTop = elem.scrollHeight;
        editor.setValue('');
        paths[editorId]="";
        fs.writeFile(pathslocation, JSON.stringify(paths, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
    else{
        fileTabCount++;

        editorId = "codeslate_" +fileTabCount;
        var fileName = address.toString().split('\\').pop();
        var filetype = fileName.split('.').pop();
        var typeext = ['cpp','cs','css','dart','json','html','java','js','kt','m','php','py','rb']
        var typefile = ['c_cpp','csharp','css','dart','hjson','html','java','javascript','kotlin','objectivec','php','python','ruby']
        var indext = typeext.indexOf(filetype);
        filetype = typefile[indext];
        editor.session.setMode("ace/mode/"+filetype);
        if(fileTabCount != 1){
            var removeactive = document.querySelector("#activexp");
            removeactive.setAttribute("id","");
        }
        $(".filesContainer").append(" <li id='"+editorId+"'><label id='activexp' for='"+editorId+"' class='fileNameSpan'>"+fileName+"</label> </li> ");
        var elem = document.getElementById('autoscrol');
        elem.scrollTop = elem.scrollHeight;
        paths[editorId]=address;
        fs.writeFile(pathslocation, JSON.stringify(paths, null, 2), function (err) {
            if (err) return console.log(err);
          });
          fs.readFile(address,(err, data) => {
            if (err) throw err;
            editor.setValue(data.toString());

        });

    }
}

let options = [{properties:["openDirectory"]},{properties:['openFile']}]

//open folder
function openfolderindock(){
  dialog.showOpenDialog(options[0], (dir) => {
      if(dir == ''){
          alert('Folder not found !');
          return;
      }
      paths2["lastfolder"]=dir.toString();
      fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
          if (err) return console.log(err);
        });
      addfoldertoexplorer(dir.toString());
     })
}
document.getElementById("chosefolderlabel").addEventListener('click', () => {
    openfolderindock()
},false);
//open file
document.getElementById('openfile').addEventListener('click', ()=> {
    dialog.showOpenDialog(options[1], (filePaths) => {
        if(filePaths == ''){
            alert('File not found !');
            return;
        }
        createNewFile(1,filePaths.toString());
       })
})

WIN = remote.getCurrentWindow();

let options1 = {
 //Placeholder 1
 title: "Save file - Electron example",

 //Placeholder 2
 defaultPath : "C:\\BrainBell.png",

 //Placeholder 4
 buttonLabel : "Save Electron File",

 //Placeholder 3
 filters :[
  {name: 'Images', extensions: ['jpg', 'png', 'gif']},
  {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
  {name: 'Custom File Type', extensions: ['as']},
  {name: 'All Files', extensions: ['*']}
 ]
}
//Or asynchronous - using callback
var annogap = 0;

function openedior(e){
  if(!e.target.innerHTML.toString().includes("<label ")){
  console.log(e.target.parentNode.id);
    var datatog = editor.getValue();
    annogap++;
    if(paths[document.querySelector("#activexp").parentNode.id] == ''){
        dialog.showSaveDialog(WIN, options, (filename) => {
            if(filename == ''){
                alert('File not saved');
                return;
            }
            fs.writeFile(filename, datatog, function (err) {
                if (err) return console.log(err);
            });
            paths[document.querySelector("#anno"+annogap).parentNode.id]=filename;
            fs.writeFile(pathslocation, JSON.stringify(paths, null, 2), function (err) {
            if (err) return console.log(err);
            document.getElementById('filenotsaved').style.display="none";
          });
          document.getElementById("anno"+annogap).innerHTML = filename.split('\\').pop();
        });

    }
    else{
        var filelocat = paths[document.querySelector("#activexp").parentNode.id];
        fs.writeFile(filelocat, datatog, function (err) {
            if (err) return console.log(err);
            document.getElementById('filenotsaved').style.display="none";
          });
    }
    var fileName = e.target.innerHTML;
    var filetype = fileName.split('.').pop();
    var typeext = ['cpp','cs','css','dart','json','html','java','js','kt','m','php','py','rb']
    var typefile = ['c_cpp','csharp','css','dart','hjson','html','java','javascript','kotlin','objectivec','php','python','ruby']
    var indext = typeext.indexOf(filetype);
    filetype = typefile[indext];
    editor.session.setMode("ace/mode/"+filetype);
    document.querySelector("#activexp").setAttribute("id","anno"+annogap);
    e.target.setAttribute("id", "activexp");
    if (paths[e.target.parentNode.id] != ''){
        fs.readFile(paths[e.target.parentNode.id],(err, data) => {
            if (err) throw err;
            editor.setValue(data.toString());

        });
    }
    else{editor.setValue('');}
  }
  else {
    alert('Click on the text only!')
  }
}

function openfolderfile(e){
  if(!e.target.innerHTML.toString().includes("<label ")){
  var len = document.getElementById('autoscrol').children;
  var present = false;
  for (var i = 0; i < len.length; i++) {
    if (!document.getElementById('autoscrol').firstElementChild) { break; }
    var elemname = len[i].firstElementChild.innerHTML;
    if (elemname === e.target.innerHTML) {
      present = true;
      document.querySelector("#activexp").setAttribute("id","");
      len[i].firstElementChild.setAttribute("id", "activexp");
      var address = paths[len[i].id]
      fs.readFile(address,(err, data) => {
        if (err) throw err;
        editor.setValue(data.toString());})
      var fileName = elemname;
      var filetype = fileName.split('.').pop();
      var typeext = ['cpp','cs','css','dart','json','html','java','js','kt','m','php','py','rb']
      var typefile = ['c_cpp','csharp','css','dart','hjson','html','java','javascript','kotlin','objectivec','php','python','ruby']
      var indext = typeext.indexOf(filetype);
      filetype = typefile[indext];
      editor.session.setMode("ace/mode/"+filetype);
      break;
    }
  }
  if (present) {
    console.log('got it');
  }
  else {
    var fileaddress= paths2["lastfolder"]+'\\'+e.target.innerHTML;
    createNewFile(1,fileaddress)
  }
}
else {
  alert('Click on the text only!')
}

}

function savefile(){
    if(document.getElementById('autoscrol').firstElementChild){
    if (paths[document.querySelector("#activexp").parentNode.id] != ''){
        fs.writeFile(paths[document.querySelector("#activexp").parentNode.id], editor.getValue(), function (err) {
            if (err) return console.log(err);
        });
    }
    else{
        dialog.showSaveDialog(WIN, options, (filename) => {
            if(filename == ''){
                alert('File not saved');
                return;
            }
            var datatog = editor.getValue();
            fs.writeFile(filename, datatog, function (err) {
                if (err) return console.log(err);
            });
            paths[document.querySelector("#activexp").parentNode.id]=filename;
            fs.writeFile(pathslocation, JSON.stringify(paths, null, 2), function (err) {
            if (err) return console.log(err);
          });
          document.getElementById("activexp").innerHTML = filename.split('\\').pop();
        });
    }
    document.getElementById('filenotsaved').style.display="none";
}
}
function addfoldertoexplorer(localfolder){
    pa = {};
    folderTabCount = 0;
    $(document).ready(function () {
        document.getElementById('autoscroll').innerHTML = '';
    var titleoflder34 = localfolder.split('\\').pop();
    document.getElementById('folderltitle').innerHTML = titleoflder34.toUpperCase();
    fs.readdir(localfolder,(err,items)=>{
        //console.log(items);
        for(var i=0; i<items.length;i++){
            //console.log(items[i]);
            folderTabCount++
            var folid = "folitem_"+folderTabCount;
            $(".folderfiles").append(" <li id='"+folid+"'><label id='stylebc' for='"+folid+"' class='fileNameSpan'>"+items[i]+"</label> </li> ");
            var elem = document.getElementById('autoscroll');
            elem.scrollTop = elem.scrollHeight;
            pa[folid]=localfolder+'\\'+items[i];
            /*paths3[folid]=localfolder+'\\'+items[i];
            fs.writeFile(pathslocation3, JSON.stringify(paths3, null, 2), function (err) {
                if (err) return console.log(err);
             });*/

        }
    });
});
}

document.getElementById('refreshbtn').addEventListener('click', ()=> {
    refresh()
})
function refresh(){
  if(paths2["lastfolder"] != ''){
      addfoldertoexplorer(paths2["lastfolder"])
  }
}
