let board = document.getElementById("board");
let menu = document.querySelector(".combined-menu");
let toolbar= document.querySelector(".toolbar");
let pencilBtn = document.querySelector(".fa-pencil-alt");
let pencilOpt = document.querySelector(".pencil-options");
let colorBtn = document.querySelector("#color");
let rangeMeter = document.querySelector("input#pen-size");

let eraserBtn = document.querySelector("#eraser");
let eraserMeter = document.querySelector(".eraser-size");

let note = document.querySelector(".note");

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
        eraserMeter.style.opacity = "1";
        eraserMeter.style.zIndex = "3";
    }else{
        eraserMeter.style.opacity = "0";
        eraserMeter.style.zIndex = "-1";
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
    
    eraserSize=rangeMeter.value;
    tool.lineWidth=eraserSize;
    
})

//sticky notes

function createTask(color,task, x, flag,id){
    // console.log(x);
    let taskContainer=document.createElement("div");

    let uifn = new ShortUniqueId();
    let uid = id || uifn();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color} <style>background-color:${x}</style>"></div>
                                    <div class="task_desc_container">
                                        <h3 class="uid">#${uid}</h3>
                                        <div class="task_desc" contenteditable="true">${task}</div>
                                    </div>
                                </div >`;
    mainContainer.appendChild(taskContainer);
}

function getCoordinates(initialY) {
    let obj = menu.getBoundingClientRect();
    return initialY - obj.height;
}

