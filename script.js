let board = document.getElementById("board");
let menu = document.querySelector(".combined-menu");
let toolbar = document.querySelector(".toolbar");
let pencilBtn = document.querySelector(".fa-pencil-alt");
let pencilOpt = document.querySelector(".pencil-options");
let colorBtn = document.querySelector("#color");
let rangeMeter = document.querySelector("input#pen-size");

let eraserBtn = document.querySelector("#eraser");
let eraserMeterCont = document.querySelector(".eraser-size");
let eraserMeter = document.querySelector("#rubber-size");

let noteBtn = document.querySelector("#note");
let mainContainer = document.querySelector(".main-container");

let undoBtn=document.querySelector("#undo");
let undo_array = [];
let undo_idx = 0;

let redoBtn=document.querySelector("#redo");
let redo_array = [];
let redo_idx = -1;


board.height = window.innerHeight;
board.width = window.innerWidth;

// console.log(toolbar.getBoundingClientRect().height);
window.addEventListener("resize", function () {
    board.height = window.innerHeight;
    board.width = window.innerWidth;
    // draw(); //called repeatedly in resizing window
})

let tool = board.getContext("2d");
tool.lineCap = "round";
// tool.fillStyle = "red";
// tool.fillRect(0, 0, board.width, board.height);

//pencil functions
let pencilOptActive = false; //check if pencil option is active or not
let penColor = "black";
let penSize = 5;
pencilBtn.addEventListener("click", function () {
    console.log(tool.lineWidth);
    pencilOptActive = !pencilOptActive;

    if (pencilOptActive == true) {
        pencilOpt.style.opacity = "1";
        pencilOpt.style.zIndex = "3";
        // tool.strokeStyle = "black";
    } else {
        pencilOpt.style.opacity = "0";
        pencilOpt.style.zIndex = "-1";
        tool.strokeStyle = penColor;
    }

    tool.strokeStyle = penColor;
    tool.lineWidth = penSize;
    let isMouseDown = false;
    board.addEventListener("mousedown", function (e) {
        // console.log("Down");
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        tool.beginPath();
        tool.moveTo(x, y);
        isMouseDown = true;
    })
    board.addEventListener("mousemove", function (e) {
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        // console.log("Move");

        if (isMouseDown == true) {
            tool.lineTo(x, y);
            tool.stroke();
        }

    })
    board.addEventListener("mouseup", function (e) {
        // console.log("Up");
        x = e.clientX;
        y = e.clientY;


        // tool.stroke();
        isMouseDown = false;

        if(e){
            undo_array.push(tool.getImageData(0, 0, board.height, board.width));
            undo_idx += 2;
        }
        // console.log(undo_array);
        
    })


})
pencilBtn.click();
pencilBtn.click();
//change pen size
rangeMeter.addEventListener("click", function () {

    penSize = rangeMeter.value;
    tool.lineWidth = penSize;

})

//change colour
colorBtn.addEventListener("input", function () {
    let colo = colorBtn.value;
    console.log(colo);
    tool.strokeStyle = colo;
    penColor = colo;
})


//eraser
let eraserOptActive = false;
let eraserColor = "white";
let eraserSize = 5;
eraserBtn.addEventListener("click", function () {
    console.log(tool.lineWidth);

    pencilOptActive = false;
    pencilOpt.style.opacity = "0";
    pencilOpt.style.zIndex = "-1";

    eraserOptActive = !eraserOptActive;
    if (eraserOptActive) {
        eraserMeterCont.style.opacity = "1";
        eraserMeterCont.style.zIndex = "3";
    } else {
        eraserMeterCont.style.opacity = "0";
        eraserMeterCont.style.zIndex = "-1";
    }

    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserSize;
    let isMouseDown = false;
    board.addEventListener("mousedown", function (e) {
        // console.log("Down");
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        tool.beginPath();
        tool.moveTo(x, y);
        isMouseDown = true;
    })
    board.addEventListener("mousemove", function (e) {
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        // console.log("Move");

        if (isMouseDown == true) {
            tool.lineTo(x, y);
            tool.stroke();
        }

    })
    board.addEventListener("mouseup", function (e) {
        // console.log("Up");
        x = e.clientX;
        y = e.clientY;


        // tool.stroke();
        isMouseDown = false;

        undo_array.push(tool.getImageData(0, 0, board.width, board.height));
        undo_idx += 2;
        // console.log(undo_array);
    })


})

eraserMeter.addEventListener("click", function () {

    eraserSize = eraserMeter.value;
    console.log(eraserSize);
    tool.lineWidth = eraserSize;
    console.log(tool.lineWidth);

})

//sticky notes
noteBtn.addEventListener("click", function () {
    createNote();
})
function createNote() {
    // console.log(x);
    let taskContainer = document.createElement("div");

    taskContainer.setAttribute("class", "sticky-note");
    taskContainer.innerHTML = `     <div class="nav">
                                        <div class="minimize"></div>
                                        <div class="close"></div>
                                    </div>
                                    <div class="writing-pad" contenteditable="true">
                                        
                                    </div>`;
    // <textarea></textarea>
    mainContainer.appendChild(taskContainer);


    taskContainer.style.position = "absolute";

    let noteNav = taskContainer.childNodes[1];
    // console.log(noteNav.childNodes[3]);
    noteNav.onmousedown = function () {
        dragValue = taskContainer;
    }
    document.onmouseup = function (e) {
        dragValue = null;
    }
    document.onmousemove = function (e) {
        if (dragValue != null) {
            var x = e.pageX;
            var y = e.pageY;

            dragValue.style.left = x + "px";
            dragValue.style.top = y + "px";
        }

    }

    let mini = noteNav.childNodes[1];
    let close = noteNav.childNodes[3];
    let pad = taskContainer.childNodes[3];

    mini.addEventListener("click", function () {
        if (pad.style.display != "none") {
            pad.style.display = "none";
        } else {
            pad.style.display = "block";
        }

    })

    close.addEventListener("click", function () {
        taskContainer.remove();
    })
}

//undo

undoBtn.addEventListener("click", function(){
    console.log("Clicked Undo");
    undo();
})

function undo(){
    
    if(undo_array.length<=0){
        alert("Canvas is empty");
    }else{
        undo_idx -=2;
        
        redo_array.push(undo_array.pop());
        redo_array.push(undo_array.pop());
        tool.clearRect(0, 0, board.width, board.height);
        
        
        // undo_array.pop()
        // console.log(undo_array);
        for(let i =0;i<undo_array.length;i+=2){ //putting it in loop fixed "Not Image type error"
            tool.putImageData(undo_array[i],0,0);
        }
        
    }
}


redoBtn.addEventListener("click", function(){
    console.log("Clicked redo");
    redo();
})

function redo(){
    
    if(redo_array.length<=0){
        alert("Reached final stroke.");
    }else{
        // redo_idx -=2;
        
        
        
        tool.clearRect(0, 0, board.width, board.height);
        console.log(redo_array);
        for(let i =0;i<1;i+=1){ //putting it in loop fixed "Not Image type error"
            // tool.putImageData(redo_array.pop(),0,0);
            
            undo_array.push(redo_array.pop());
            undo_array.push(redo_array.pop());
            
            for(let i =0;i<undo_array.length;i+=1){ //putting it in loop fixed "Not Image type error"
                tool.putImageData(undo_array[i],0,0);
            }
        }
        
    }
}


function getCoordinates(initialY) {
    let obj = menu.getBoundingClientRect();
    return initialY - obj.height;
}

