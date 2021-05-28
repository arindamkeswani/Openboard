let board = document.getElementById("board");
let menu = document.querySelector(".combined-menu");
let toolbar= document.querySelector(".toolbar");
let pencilBtn = document.querySelector(".fa-pencil-alt");
let pencilOpt = document.querySelector(".pencil-options");
let colorBtn = document.querySelector("#color");
let rangeMeter = document.querySelector("input#pen-size");

let eraserBtn = document.querySelector("#eraser");
let eraserMeterCont = document.querySelector(".eraser-size");
let eraserMeter = document.querySelector("#rubber-size");

let noteBtn = document.querySelector("#note");
let mainContainer = document.querySelector(".main-container");
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
let penColor="black";
let penSize = 5;
pencilBtn.addEventListener("click", function () {
    console.log(tool.lineWidth);
    pencilOptActive=!pencilOptActive;

    if(pencilOptActive==true){
        pencilOpt.style.opacity = "1";
        pencilOpt.style.zIndex = "3";
        // tool.strokeStyle = "black";
    }else{
        pencilOpt.style.opacity = "0";
        pencilOpt.style.zIndex = "-1";
        tool.strokeStyle = penColor;
    }
    
    tool.strokeStyle = penColor;
    tool.lineWidth = penSize;
    let isMouseDown = false;
    document.body.addEventListener("mousedown", function (e) {
        // console.log("Down");
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        tool.beginPath();
        tool.moveTo(x, y);
        isMouseDown = true;
    })
    document.body.addEventListener("mousemove", function (e) {
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        // console.log("Move");

        if (isMouseDown == true) {
            tool.lineTo(x, y);
            tool.stroke();
        }

    })
    document.body.addEventListener("mouseup", function (e) {
        // console.log("Up");
        x = e.clientX;
        y = e.clientY;


        // tool.stroke();
        isMouseDown = false;
    })


})

//change pen size
rangeMeter.addEventListener("click", function(){
    
    penSize=rangeMeter.value;
    tool.lineWidth=penSize;
    
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
let eraserColor="white";
let eraserSize = 5;
eraserBtn.addEventListener("click", function () {
    console.log(tool.lineWidth);

    pencilOptActive=false;
    pencilOpt.style.opacity = "0";
    pencilOpt.style.zIndex = "-1";

    eraserOptActive = !eraserOptActive;
    if(eraserOptActive){
        eraserMeterCont.style.opacity = "1";
        eraserMeterCont.style.zIndex = "3";
    }else{
        eraserMeterCont.style.opacity = "0";
        eraserMeterCont.style.zIndex = "-1";
    }

    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserSize;
    let isMouseDown = false;
    document.body.addEventListener("mousedown", function (e) {
        // console.log("Down");
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        tool.beginPath();
        tool.moveTo(x, y);
        isMouseDown = true;
    })
    document.body.addEventListener("mousemove", function (e) {
        x = e.clientX;
        y = e.clientY;
        y = getCoordinates(y);
        // console.log("Move");

        if (isMouseDown == true) {
            tool.lineTo(x, y);
            tool.stroke();
        }

    })
    document.body.addEventListener("mouseup", function (e) {
        // console.log("Up");
        x = e.clientX;
        y = e.clientY;


        // tool.stroke();
        isMouseDown = false;
    })


})

eraserMeter.addEventListener("click", function(){
    
    eraserSize=eraserMeter.value;
    console.log(eraserSize);
    tool.lineWidth=eraserSize;
    console.log(tool.lineWidth);
    
})

//sticky notes
noteBtn.addEventListener("click", function(){
    createNote()
})
function createNote(){
    // console.log(x);
    let taskContainer=document.createElement("div");

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

    let noteNav=taskContainer.childNodes[1];
    // console.log(noteNav.childNodes[3]);
    noteNav.onmousedown = function(){
        dragValue = taskContainer;
    }
    document.onmouseup = function(e){
        dragValue=null;
    }
    document.onmousemove = function(e){
        if(dragValue!=null){
            var x= e.pageX;
            var y= e.pageY;
    
            dragValue.style.left = x+"px";
            dragValue.style.top = y+"px";
        }
        
    }
    
    let mini = noteNav.childNodes[1];
    let close = noteNav.childNodes[3];
    let pad = taskContainer.childNodes[3];

    mini.addEventListener("click", function(){
        if(pad.style.display != "none"){
            pad.style.display = "none";
        }else{
            pad.style.display = "block";
        }
        
    })
    
    close.addEventListener("click",function(){
        taskContainer.remove();
    })
}




function getCoordinates(initialY) {
    let obj = menu.getBoundingClientRect();
    return initialY - obj.height;
}

