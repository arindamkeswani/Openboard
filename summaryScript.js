let refreshBtn = document.querySelector(".refresh-container")


refreshBtn.addEventListener("click", function(){
    var x = localStorage.getItem("scrumLocalStorage");
    console.log(x);
})