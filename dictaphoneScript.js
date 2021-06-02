let recordBtn = document.querySelector(".record-btn");
let textArea = document.querySelector("textarea");
let transcriptBtn = document.querySelector("#txt");
var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();

var spokenContent="";

recognition.continuous = true;
var isRecordingOn = false;

recognition.onerror = function(){
    alert("Failed to perform voice-to-text at thia time. Please try again in some time.")
}

recognition.onresult = function(event){
    var current= event.resultIndex;

    var transcript =  event.results[current][0].transcript;

    spokenContent += transcript;
    textArea.value = spokenContent;
}
recordBtn.addEventListener("click", function(){
    if(isRecordingOn){ //turn recording off
        isRecordingOn = false;
        recordBtn.style.backgroundColor = "white";
        recordBtn.style.color = "black";
        // recordBtn.style.border = "none";
        recognition.stop();
        console.log("Content:", spokenContent);

    }else{ //turn recording on
        // console.log("Recording on");
        isRecordingOn = true;
        recordBtn.style.backgroundColor = "lightgrey";
        recordBtn.style.color = "red";
        // recordBtn.style.border = "2px solid grey";
        
        if(spokenContent.length){ //check if text is already present
            spokenContent="";
        }

        recognition.start();
        textArea.value = "";
    }
})

transcriptBtn.addEventListener("click", function(){
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

    
    // const timestamp = currentDate.getTime(); //full time stamp

    let body = "Date: " + dateString + "\n\nTime: " + formattedTime + "\n\nTranscript:\n";
    body+=spokenContent;

    const textToBLOB = new Blob([body], { type: 'text/plain' });
    const sFileName = `Dictaphone transcript ${dateString} ${formattedTime}.txt`;	   // The file to save the data.

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