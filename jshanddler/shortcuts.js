$(window).bind("keydown", function (event) {

    if (event.ctrlKey || event.metaKey) {
      if (event.shiftKey){
        event.preventDefault();
        switch (String.fromCharCode(event.which).toLowerCase()) {
          case 'w':
              event.preventDefault();
              removealltab();
              break;
        }
      }
      else {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 'n':
                event.preventDefault();
                createNewFile(0,'');
                break;

            case 's':
                event.preventDefault();
                savefile();
                break;

            case 'w':
                event.preventDefault();
                removetab()
                break;
            case 'b':
                event.preventDefault();
                hidesidepanel()
                break;
            case 'r':
                event.preventDefault();
                refresh()
                break;
            case 'i':
                event.preventDefault();
                opensetting()
                break;
        }
        }

    }

})
