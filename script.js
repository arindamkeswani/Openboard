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

let uploadBtn = document.querySelector("#file-upload");
let downloadBtn = document.querySelector("#download");

let undoBtn = document.querySelector("#undo");
let undo_array = [];
let undo_idx = 0;

let redoBtn = document.querySelector("#redo");
let redo_array = [];
let redo_idx = -1;



board.height = window.innerHeight - toolbar.getBoundingClientRect().height - 60;
board.width = window.innerWidth - 60;
// board.height = window.innerHeight;
// board.width = window.innerWidth;

console.log(toolbar.getBoundingClientRect().height);
// window.addEventListener("resize", function () {
//     // board.height = window.innerHeight;
//     // board.width = window.innerWidth;


// })

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
})
pencilBtn.click();
pencilBtn.click();

//board listener
isMouseDown = false;
board.addEventListener("mousedown", function (e) {
    // console.log("Down");
    x = e.clientX;
    y = e.clientY;
    y = getCoordinates(y);
    tool.beginPath();
    tool.moveTo(x, y);
    isMouseDown = true;


    let point = {
        x: e.clientX,
        y: getCoordinates(e.clientY),
        identifier: "mousedown",
        color: tool.strokeStyle,
        width: tool.lineWidth
    };

    undo_array.push(point);

    // if (e) {
    //     undo_array.push(tool.getImageData(0, 0, board.height, board.width));
    //     undo_idx += 2;
    // }
})
board.addEventListener("mousemove", function (e) {
    x = e.clientX;
    y = e.clientY;
    y = getCoordinates(y);
    // console.log("Move");

    if (isMouseDown == true) {
        tool.lineTo(x, y);
        tool.stroke();


        let point = {
            x: e.clientX,
            y: getCoordinates(e.clientY),
            identifier: "mousemove",
            color: tool.strokeStyle,
            width: tool.lineWidth
        };

        undo_array.push(point);
    }
    // if (e) {
    //     undo_array.push(tool.getImageData(0, 0, board.height, board.width));
    //     undo_idx += 2;
    // }

})
board.addEventListener("mouseup", function (e) {
    // console.log("Up");
    x = e.clientX;
    y = e.clientY;


    // tool.stroke();
    isMouseDown = false;

    // if (e) {
    //     undo_array.push(tool.getImageData(0, 0, board.height, board.width));
    //     undo_idx += 2;
    // }
    // console.log(undo_array);

})
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
    // board.addEventListener("mousedown", function (e) {
    //     // console.log("Down");
    //     x = e.clientX;
    //     y = e.clientY;
    //     y = getCoordinates(y);
    //     tool.beginPath();
    //     tool.moveTo(x, y);
    //     isMouseDown = true;
    //     // undo_array.push(tool.getImageData(0, 0, board.width, board.height));
    // })
    // board.addEventListener("mousemove", function (e) {
    //     x = e.clientX;
    //     y = e.clientY;
    //     y = getCoordinates(y);
    //     // console.log("Move");

    //     if (isMouseDown == true) {
    //         tool.lineTo(x, y);
    //         tool.stroke();
    //     }
    //     undo_array.push(tool.getImageData(0, 0, board.width, board.height));
    //     // print(undo_array.length);

    // })
    // board.addEventListener("mouseup", function (e) {
    //     // console.log("Up");
    //     x = e.clientX;
    //     y = e.clientY;


    //     // tool.stroke();
    //     isMouseDown = false;

    //     // undo_array.push(tool.getImageData(0, 0, board.width, board.height));
    //     undo_idx += 2;
    //     // console.log(undo_array);
    // })


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

undoBtn.addEventListener("mousedown", function (e) {
    // console.log(e.type);

    // console.log("Clicked Undo", undo_array.length);
    undo();


})


function undo() {
    if (undo_array.length >= 0) {
        redo_array.push(undo_array.pop());
        redraw_canvas();

    } else {
        alert("Canvas is empty");
    }

}


// function undo() {

//     if (undo_array.length <= 0) {
//         alert("Canvas is empty");
//     } else {
//         undo_idx -= 2;

//         for(let i=0;i<1;i++){
//             redo_array.push(undo_array.pop());
//         }

//         tool.clearRect(0, 0, board.width, board.height);


//         // undo_array.pop()
//         // console.log(undo_array);
//         for (let i = 0; i < undo_array.length; i += 1) { //putting it in loop fixed "Not Image type error"
//             tool.putImageData(undo_array[i], 0, 0);
//         }

//     }
// }


redoBtn.addEventListener("mousedown", function () {
    console.log("Clicked redo");
    redo();
})


// **********************redo Stack
function redo() {
    if (redo_array.length > 0) {
        undo_array.push(redo_array.pop());
        redraw_canvas();
        //   return true;
    } else {
        alert("Reached final stroke.")
        // return false;
    }


}
// function redo() {

//     if (redo_array.length <= 0) {
//         alert("Reached final stroke.");
//         for (let i = 0; i < undo_array.length; i += 1) {
//             tool.putImageData(undo_array[i], 0, 0);
//         }
//     } else {
//         // redo_idx -=2;


//         undo_array.push(redo_array.pop());
//         tool.clearRect(0, 0, board.width, board.height);
//         console.log(redo_array.length);
//         // console.log(undo_array.length);
//         for (let i = 0; i < 1; i += 1) { //putting it in loop fixed "Not Image type error"
//             // tool.putImageData(redo_array.pop(),0,0);





//             for (let i = 0; i < undo_array.length; i += 1) { //putting it in loop fixed "Not Image type error"
//                 tool.putImageData(undo_array[i], 0, 0);
//             }
//         }

//     }
// }


function redraw_canvas() {
    tool.clearRect(0, 0, board.width, board.height);

    for (let i = 0; i < undo_array.length; i += 2) {
        let { x, y, identifier, color, width } = undo_array[i];
        // console.log(x, y, identifier);
        tool.strokeStyle = color;
        tool.lineWidth = width;
        if (identifier == "mousedown") {
            tool.beginPath();
            tool.moveTo(x, y);
        } else if (identifier == "mousemove") {
            tool.lineTo(x, y);
            tool.stroke();
        }
    }
}


let imgCount = 0;
uploadBtn.addEventListener("change", function () {
    if (this.files && this.files[0]) {
        // console.log("Clicked upload button");
        // console.log(uploadBtn.value);
        // console.log(this.files[0]);


        let imgContainer = document.createElement("div");

        imgContainer.setAttribute("class", "img-note");
        imgContainer.innerHTML = `<div class="nav">
                                        <div class="minimize"></div>
                                        <div class="close"></div>
                                    </div>
                                    <div class="image">
                                        <img id="image${imgCount + 1}" src=" " width="100%" height="100%"/>   
                                    </div>`
        // <textarea></textarea>
        imgCount += 1;
        mainContainer.appendChild(imgContainer);

        img = document.querySelector(`#image${imgCount}`);
        // console.log(img);
        img.src = URL.createObjectURL(this.files[0]);
        //IMAGE UPLOADED----------------------------------------

        let noteNav = imgContainer.childNodes[0];
        // console.log(noteNav.childNodes);
        // // console.log(noteNav.childNodes[3]);
        noteNav.onmousedown = function () {
            dragValue = imgContainer;
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
        // let pad = taskContainer.childNodes[3];

        mini.addEventListener("click", function () {
            if (img.style.display != "none") {
                img.style.display = "none";
            } else {
                img.style.display = "block";
            }

        })

        close.addEventListener("click", function () {
            imgContainer.remove();
            imgContainer -= 1;
        })

    }

})

downloadBtn.addEventListener("click", function () {
    // console.log("Download area");
    let canvas = document.createElement("canvas");
    canvas.width = board.width;
    canvas.height = board.height;

    let link = canvas.toDataURL();
    // download 
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "file.png";
    anchor.click();
    anchor.remove();
})
function getCoordinates(initialY) {
    let obj = menu.getBoundingClientRect();
    return initialY - obj.height;
}

