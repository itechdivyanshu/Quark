const {remote} = require('electron');
var winst = 0;
    

var minimise = document.getElementById("minimise");
var maximise = document.getElementById("maximise");
var quit = document.getElementById("quit");


minimise.addEventListener('click',minimiseApp);
maximise.addEventListener('click',maximiseApp);
quit.addEventListener('click',quitApp);
const {ipcRenderer} = require('electron')
function minimiseApp(){
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximiseApp(){
    if (winst == 1){
        ipcRenderer.send('resize-me-please');
        winst-=1;
        paths2["win_state"]=winst;
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }else{
        remote.getCurrentWindow().maximize();
        winst++;
        paths2["win_state"]=winst;
        fs.writeFile(pathslocation2, JSON.stringify(paths2, null, 2), function (err) {
            if (err) return console.log(err);
          });
    }
    
    
    //console.log(winst);
}

function quitApp(){
    remote.getCurrentWindow().close();
}