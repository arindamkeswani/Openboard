let noteBtn = document.querySelector(".note-btn-container");
let mainContainer = document.querySelector(".main-container");
let body = document.querySelector("body");
let progressBarValueElem = document.querySelector(".progress-bar-value");
let summaryBtn = document.querySelector(".summary-btn-container");

let summaryObj = [];

noteBtn.addEventListener("click", function () {
    createNote();
})

numNotes = 0;

doneNotes = 0;
numNotes = 0;
let progress = 0;
function createNote() {
    let taskContainer = document.createElement("div");

    taskContainer.setAttribute("class", "sticky-note");
    taskContainer.innerHTML = `     <div class="nav" id="${numNotes++}">
                                        <div class="red"></div>
                                        <div class="orange"></div>
                                        <div class="yellow"></div>
                                        <div class="blue"></div>
                                        <div class="check"><i class="fas fa-check"></i></div>
                                        <div class="minimize"><i class="fas fa-plus"></i></div>
                                        <div class="closeNote"><i class="fas fa-times"></i></div>
                                    </div>
                                    <div class="writing-pad" contenteditable="true">
                                    </div>`;
    // <textarea></textarea>

    mainContainer.appendChild(taskContainer);


    taskContainer.style.position = "absolute";
    // console.log(taskContainer.childNodes);
    let noteNav = taskContainer.childNodes[1];
    // console.log(noteNav.childNodes);


    let lastX = 0;
    let lastY = 0;

    // console.log(body.getBoundingClientRect());

    noteNav.onmousedown = function () {
        dragValue = taskContainer;
    }
    document.onmouseup = function (e) {
        dragValue = null;
        // console.log(body.getBoundingClientRect().width);
        // if(lastX >= 0.6*body.getBoundingClientRect().width){

        //     noteProgress[noteId]= true;
        //     doneNotes=0;
        //     for(let i=0;i<noteProgress;i++){
        //         if(noteProgress[noteId] == true){
        //             doneNotes+=1;
        //         }

        //     }

        //     progress = (numNotes / noteProgress.length)*100;
        //     console.log(noteProgress);
        //     console.log(progress);
        // }else{
        //     noteProgress[noteId]= false;
        //     doneNotes=0;
        //     for(let i=0;i<noteProgress;i++){
        //         if(noteProgress[noteId] == true){
        //             doneNotes+=1;
        //         }

        //     }

        //     progress = (doneNotes / noteProgress.length)*100;
        //     console.log(noteProgress);
        //     console.log(progress);
        // }

    }
    document.onmousemove = function (e) {
        if (dragValue != null) {
            var x = e.pageX;
            var y = e.pageY;

            dragValue.style.left = x + "px";
            dragValue.style.top = y + "px";

            lastX = e.pageX;
            // lastY = e.pageY;
        }

    }

    let checkBtn = noteNav.childNodes[9];


    checkBtn.addEventListener("click", function () {
        if (checkBtn.style.backgroundColor == "black") { //it is done
            doneNotes -= 1;
            checkBtn.style.backgroundColor = "white";
            checkBtn.style.color = "black";
            progress = (doneNotes / numNotes) * 100;
            // console.log(doneNotes);
            // console.log(numNotes);
            // console.log(progress);
            progressBarValueElem.innerText = progress + "%";
            progressBarValueElem.style.width = progress + "%";
        } else { //it is not done
            doneNotes += 1;
            checkBtn.style.backgroundColor = "black";
            checkBtn.style.color = "white";
            progress = (doneNotes / numNotes) * 100;
            // console.log(doneNotes);
            // console.log(numNotes);
            // console.log(progress);
            progressBarValueElem.innerText = progress + "%";
            progressBarValueElem.style.width = progress + "%";
        }

    })
    checkBtn.click();
    checkBtn.click();

    let mini = noteNav.childNodes[11];
    let close = noteNav.childNodes[13];
    let pad = taskContainer.childNodes[3];
    // console.log(document.querySelector(".sticky-note").childNodes);

    mini.addEventListener("click", function () {
        if (pad.style.display != "none") {
            pad.style.display = "none";
        } else {
            pad.style.display = "block";
        }

    })

    close.addEventListener("click", function () {
        if (checkBtn.style.backgroundColor == "black") {//it is done
            doneNotes -= 1;
        }
        numNotes -= 1;
        taskContainer.remove();
        progress = (doneNotes / numNotes) * 100;
        progressBarValueElem.innerText = progress + "%";
        progressBarValueElem.style.width = progress + "%";
    })

    let redChange = noteNav.childNodes[1];
    let orangeChange = noteNav.childNodes[3];
    let yellowChange = noteNav.childNodes[5];
    let blueChange = noteNav.childNodes[7];

    redChange.addEventListener("click", function () {
        pad.style.backgroundColor = "#A84040"; //rgb(168, 64, 64)
        noteNav.style.backgroundColor = "#A84040";
    })
    orangeChange.addEventListener("click", function () {
        pad.style.backgroundColor = "#f69552"; //rgb(246, 149, 82)
        noteNav.style.backgroundColor = "#f69552";
    })
    yellowChange.addEventListener("click", function () {
        pad.style.backgroundColor = "#EED971FF"; //rgb(238, 217, 113)
        noteNav.style.backgroundColor = "#EED971FF";
    })
    blueChange.addEventListener("click", function () {
        pad.style.backgroundColor = "#CCE1F2"; //rgb(204, 225, 242)
        noteNav.style.backgroundColor = "#CCE1F2";
    })
}

summaryBtn.addEventListener("click", function () {
    summaryObj = [];
    progress = (doneNotes / numNotes) * 100;
    progressBarValueElem.innerText = progress + "%";
    progressBarValueElem.style.width = progress + "%";

    summaryObj.push(progress);

    let notesArr = document.querySelectorAll(".sticky-note");
    // console.log(notesArr[0].childNodes[1].style.backgroundColor);

    for (let i = 0; i < notesArr.length; i++) {
        // console.log(notesArr[0].childNodes[3].textContent);//gets text inside writing pad
        // console.log(notesArr[0].childNodes[1].childNodes[9].style.backgroundColor); //gets checked background colour to check if done or not
        // console.log(notesArr[0].childNodes[1].style.backgroundColor); //gives background colour of note, for priority
        let done = "";
        let priority = "";
        let textVal = "";

        textVal = notesArr[i].childNodes[3].textContent;

        if (notesArr[i].childNodes[1].childNodes[9].style.backgroundColor == "black") {
            done = "Yes";
        } else {
            done = "No";
        }

        let bgCol = notesArr[i].childNodes[1].style.backgroundColor;
        if (bgCol == "rgb(168, 64, 64)") {
            priority = "Very high";
        } else if (bgCol == "rgb(246, 149, 82)") {
            priority = "High";
        } else if (bgCol == "rgb(238, 217, 113)") {
            priority = "Average";
        } else if (bgCol == "rgb(204, 225, 242)") {
            priority = "Low";
        } else {
            priority = "Very Low";
        }

        //push everything into array
        summaryObj.push(
            {
                content: textVal,
                priority: priority,
                done: done
            }
        )
    }


    console.log(summaryObj);
})