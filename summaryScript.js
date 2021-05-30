let refreshBtn = document.querySelector(".refresh-container")
let list = document.querySelector(".list");
let progressContainer = document.querySelector(".progress-container");
let screenshotBtn = document.querySelector("#screenshot");
let txtBtn = document.querySelector("#txt");
let emailBtn = document.querySelector("#email");

refreshBtn.addEventListener("click", function () {
    var x = JSON.parse(localStorage.getItem("scrumLocalStorage"));

    console.log(x);

    if (document.querySelector("article") == null) {
        prog = x[0];
        // console.log("Progress: " + prog + "%");


        for (let i = 1; i < x.length; i++) {
            let id = x[i].taskID;
            let content = x[i].content;
            let priority = x[i].priority;
            let done = x[i].done;
            // console.log("Details ", id, content, priority, done);


            changeProgressBar(prog);
            addTaskToList(id, content, priority, done);
        }


    } else {
        artList = document.querySelectorAll("article")
        for (let i = 0; i < artList.length; i++) {
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

function changeProgressBar(prog) {
    progressContainer.style.width = prog * 0.8 + "%";
    progressContainer.innerText = prog + "%";
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



    list.appendChild(taskContainer);

}


screenshotBtn.addEventListener("click", function () {
    // print();
    var screenshotTarget = document.querySelector(".list-container");

    html2canvas(screenshotTarget).then((canvas) => {
        // body.appendChild(canvas);
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

        var hours = currentDate.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + currentDate.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + currentDate.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        const base64image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = base64image;
        anchor.download = `Summary Screenshot ${dateString} ${formattedTime}.png`;
        anchor.click();
        anchor.remove();
        // window.location.href = base64image;
    });
})

txtBtn.addEventListener("click", function () {

    var x = JSON.parse(localStorage.getItem("scrumLocalStorage"));
    let { body, dateString, formattedTime } = createSummary(x);

    const textToBLOB = new Blob([body], { type: 'text/plain' });
    const sFileName = `Summary Text ${dateString} ${formattedTime}.txt`;	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
    newLink.remove();

})




function createSummary(x) {
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

    var hours = currentDate.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + currentDate.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + currentDate.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(formattedTime);
    // const currentDate = new Date();
    // const timestamp = currentDate.getTime(); //full time stamp

    let body = "Date: " + dateString + "\n\nTime: " + formattedTime + "\n\n";


    body += "Progress: " + progressContainer.innerText + "\n\n";

    for (let i = 1; i < x.length; i++) {
        body += "Task ID: " + x[i].taskID + "\n";
        body += "Task: " + x[i].content + "\n";
        body += "Priority: " + x[i].priority + "\n";
        body += "Work finished: " + x[i].done + "\n";
        body += "_____" + "\n";
    }

    return { body, dateString, formattedTime };
}