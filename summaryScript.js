let refreshBtn = document.querySelector(".refresh-container")
let list = document.querySelector(".list");
let progressContainer = document.querySelector(".progress-container");

refreshBtn.addEventListener("click", function () {
    var x = JSON.parse(localStorage.getItem("scrumLocalStorage"));

    console.log(x);

    if (document.querySelector("article") == null) {
        prog = x[0];
        console.log("Progress: " + prog + "%");


        for (let i = 1; i < x.length; i++) {
            let id = x[i].taskID;
            let content = x[i].content;
            let priority = x[i].priority;
            let done = x[i].done;
            console.log("Details ", id, content, priority, done);


            changeProgressBar(prog);
            addTaskToList(id, content, priority, done);
        }


    }else{
        artList = document.querySelectorAll("article")
        for(let i=0;i<artList.length;i++){
            artList[i].remove();
        }
        
        prog = x[0];
        console.log("Progress: " + prog + "%");


        for (let i = 1; i < x.length; i++) {
            let id = x[i].taskID;
            let content = x[i].content;
            let priority = x[i].priority;
            let done = x[i].done;
            console.log("Details ", id, content, priority, done);


            
            
            addTaskToList(id, content, priority, done);
        }
    }

})

function changeProgressBar(prog){
    progressContainer.style.width = prog*0.8 +"%";
    progressContainer.innerText = prog+"%";
}

function addTaskToList(id, content, priority, done) {

    let taskContainer = document.createElement("article");

    taskContainer.setAttribute("class", "task");
    taskContainer.innerHTML = `<div class="taskNo" id="${id}">${id}</div>
                                <div class="taskContent">
                                    <div class="title">Task</div>
                                    <p>${content}</p>
                                    <div class="title">Priority</div>
                                    <p>${priority}</p>
                                    <div class="title">Finished</div>
                                    <p>${done}</p>
                                </div>
    `;
    // <textarea></textarea>

    list.appendChild(taskContainer);
}
