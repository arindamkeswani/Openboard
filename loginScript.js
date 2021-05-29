let submitBtn = document.querySelector('#submit');
let submitLink = document.querySelector("a");
var credentials=[
    {
        user:"arindam",
        password:"1234"
    },
    {
        user:"admin",
        password:"1234"
    }
]
function validate(){

    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    var valid=false;
    for(let i=0;i<credentials.length;i++){
        if(credentials[i].user == username){
            if(credentials[i].password == password){
                // alert("Logged in successfully");
                submitLink.href = "whiteboard.html";
                valid=true;
                break;
            }
        }
    }

    if(valid==false){
        alert("Log-in failed. Username-Password pair invalid");
        submitLink.href = "login.html";
    }
}

submitBtn.addEventListener("click",function(){
    validate();
});