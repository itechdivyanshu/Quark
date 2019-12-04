$(window).bind("keydown", function (event) { 

    if (event.ctrlKey || event.metaKey) { 

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

        }

    }
    
})

