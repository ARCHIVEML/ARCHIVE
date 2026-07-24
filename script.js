
const PASSWORD = "OWL";

console.log("NEW SCRIPT LOADED");
let searchProtocolEnabled = false;
let hiddenFileFound = false;
let recoveryComplete = false;
let nullUnlocked = false;
let repeatUnlocked = false;

let isTyping = false;



// загрузка сохранения

function loadSave(){

    searchProtocolEnabled = localStorage.getItem("searchProtocol") === "true";
    hiddenFileFound = localStorage.getItem("hiddenFile") === "true";
    recoveryComplete = localStorage.getItem("recovered") === "true";

    nullUnlocked = false;
    repeatUnlocked = false;

}



function save(){

    localStorage.setItem("searchProtocol", searchProtocolEnabled);
    localStorage.setItem("hiddenFile", hiddenFileFound);
    localStorage.setItem("recovered", recoveryComplete);
    localStorage.setItem("nullUnlocked", nullUnlocked);
    localStorage.setItem("repeatUnlocked", repeatUnlocked);

}



loadSave();





function typeText(element, text, speed = 20){


    if(isTyping) return;


    isTyping = true;


    let i = 0;


    let interval = setInterval(()=>{


        element.innerHTML += text.charAt(i);
window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
});

        i++;


        if(i >= text.length){

            clearInterval(interval);
            isTyping = false;

        }


    }, speed);


}







function login(){


    let pw = document
    .getElementById("pw")
    .value
    .toUpperCase();



    if(pw === PASSWORD){



        document
        .getElementById("login")
        .classList
        .add("hidden");



        document
        .getElementById("boot")
        .classList
        .remove("hidden");



        let log = [

            "INITIALIZING SYSTEM...",
            "CHECKING MEMORY...",
            "ACCESSING ARCHIVE DATABASE...",
            "DECRYPTING BLOCKS...",
            "ACCESS GRANTED."

        ];



        let i = 0;



        let timer = setInterval(()=>{



            document
            .getElementById("bootlog")
            .innerHTML += log[i] + "\n";



            i++;



            if(i >= log.length){



                clearInterval(timer);



                setTimeout(()=>{



                    document
                    .getElementById("boot")
                    .classList
                    .add("hidden");



                    document
                    .getElementById("archive")
                    .classList
                    .remove("hidden");



                    document
                    .getElementById("terminal")
                    .innerHTML =
`
ARCHIVE SYSTEM ONLINE

Type HELP for commands.

`;



                },1000);



            }



        },700);



    }


    else{


        document
        .getElementById("msg")
        .innerHTML =
        "ACCESS DENIED";


    }



}








function systemGlitch(){


    let body = document.body;
    let archive = document.getElementById("archive");
    let terminal = document.getElementById("terminal");


    body.classList.add("glitch");

    archive.classList.add("shake");


    terminal.innerHTML +=
`
<br>

<span class="glitchText">

SYSTEM FAILURE...

<br>

MEMORY DESYNC...

<br>

RECOVERY IMPOSSIBLE...

</span>

`;



    setTimeout(()=>{

        body.classList.remove("glitch");
        archive.classList.remove("shake");

    },3000);


}
function runCommand(){



    if(isTyping) return;



    let input = document.getElementById("command");

    let cmd = input.value.toUpperCase();

    let terminal = document.getElementById("terminal");



    typeText(
        terminal,
        "\n> " + cmd + "\n",
        30
    );





    setTimeout(()=>{



        let output = "";








        if(cmd == "HELP"){



            output =
`
COMMANDS:


LIST

SEARCH

RECOVER


OPEN ARC-027

OPEN ARC-099

OPEN ARC-033

`;



            if(nullUnlocked){

                output +=
`
OPEN ARC-NULL

`;

            }



            if(repeatUnlocked){

                output +=
`
INITIALIZE

`;

            }



            output +=
`
CLEAR

`;



        }









        else if(cmd == "LIST"){



            output =
`
FILES:


ARC-027 [LOCKED]

ARC-099 [UNKNOWN]

ARC-033 [CORRUPTED]

`;



            if(hiddenFileFound){


                output +=
`
HIDDEN:

ARC-000 [DELETED]

`;

            }




        }









        else if(cmd == "OPEN ARC-027"){



            output =
`
FILE:

ARC-027



STATUS:

LOCKED



ACCESS DENIED.



[ERROR]


INSUFFICIENT ACCESS LEVEL.



`;



        }









        else if(cmd == "OPEN ARC-099"){



            output =
`
FILE:

ARC-099



STATUS:

UNKNOWN



LOADING DATA...



██████████ 100%



[ERROR]


FILE STRUCTURE INVALID.



[ERROR]


READ OPERATION TERMINATED.



`;



        }









        else if(cmd == "OPEN ARC-033"){



            searchProtocolEnabled = true;

            save();



            output =
`
FILE:

ARC-033



STATUS:

PARTIALLY RECOVERED



OWNER:

UNKNOWN



RECOVERY:

87%



--------------------------------


SEARCH PROTOCOL ENABLED.



--------------------------------



`;



        }









        else if(cmd == "SEARCH"){



            if(searchProtocolEnabled){



                hiddenFileFound = true;

                save();



                output =
`
SEARCHING DATABASE...


MATCH FOUND.



FILE:

ARC-000



STATUS:

DELETED



OWNER:

UNKNOWN



WARNING:


This file existed

before ARC-033.



ACCESS POSSIBILITY:

RECOVERABLE



`;



            }



            else{



                output =
`
SEARCHING DATABASE...


NO MATCHES FOUND.



INDEX ERROR.



`;



            }



        }









        else if(cmd == "RECOVER"){



            if(hiddenFileFound){



                recoveryComplete = true;

                nullUnlocked = true;

                localStorage.setItem("nullUnlocked", "true");


                output =
`
RECOVERY PROCESS STARTED...


10%

30%

50%

70%

90%

100%



--------------------------------


ARC-000 RESTORED.



STATUS:

PARTIALLY DAMAGED



RECOVERED MESSAGE:



"THE FIRST ARCHIVE

WAS NEVER NUMBERED."



--------------------------------


NEW DATA FOUND:


REFERENCE:

ARC-NULL



`;



            }



            else{



                output =
`
RECOVERY FAILED.


NO RECOVERABLE DATA FOUND.



`;



            }



        }

        else if(cmd == "OPEN ARC-NULL"){



            if(nullUnlocked){



                output =
`
ACCESSING ARC-NULL...


LOADING ORIGINAL DATA...



ERROR.



ERROR.



ERROR.



--------------------------------


SYSTEM FAILURE.



MEMORY CORRUPTION DETECTED.



RESTARTING ARCHIVE SYSTEM...



`;



                typeText(
                    terminal,
                    output,
                    20
                );

systemGlitch();

                setTimeout(()=>{



                    repeatUnlocked = true;

localStorage.setItem("repeatUnlocked", "true");



                    document
                    .getElementById("archive")
                    .classList
                    .add("hidden");



                    document
                    .getElementById("login")
                    .classList
                    .remove("hidden");



                    document
                    .getElementById("pw")
                    .value = "";



                },5000);



                input.value = "";

                return;



            }



        }


        else if(cmd == "INITIALIZE"){


    if(repeatUnlocked){


        output =
`
OPENING ARC-NULL...


ACCESSING RECOVERED DATA...


LOADING...

`;


        typeText(
            terminal,
            output,
            20
        );


        setTimeout(()=>{


            fetch("data/code.txt")

            .then(response => response.text())

            .then(text => {


                typeText(
                    terminal,
                    "\n\n" + text,
                    20
                );


            });


        },1500);


        return;


    }


    else{


        output =
`
ACCESS DENIED

INITIALIZE LOCKED

`;

    }

}

else if(cmd == "CLEAR"){

    terminal.innerHTML =
`
ARCHIVE SYSTEM ONLINE

Type HELP for commands.

`;

    input.value = "";

    return;

}


else{

    output =
`
UNKNOWN COMMAND

`;

}


typeText(
    terminal,
    output,
    20
);

},500);

input.value = "";

}
function showSecretImage(){


    let terminal = document.getElementById("terminal");


    terminal.innerHTML +=
`
<br><br>

LOADING IMAGE...

<br>

<div id="imageLoader">

<img src="img/photo.png" id="secretPhoto">

</div>

`;



    let img = document.getElementById("secretPhoto");


    img.onload = ()=>{


        let height = img.naturalHeight;

        let current = 0;


        img.style.height = "0px";


        let timer = setInterval(()=>{


            current += height / 50;


            img.style.height = current + "px";


            if(current >= height){


                img.style.height = "auto";

                clearInterval(timer);


            }


        },50);


    };


}