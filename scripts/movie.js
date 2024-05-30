// Mobile view port Menu////////////////////////////////////
const humbug = document.querySelector(".hambug");
const humbugUl = document.querySelector(".hambug-ul");

humbug.addEventListener("click", ()=>{
    if(humbug.innerHTML == `<i class="fa fa-bars"></i>`){
        humbug.innerHTML = `<i class="fa fa-caret-up"></i>`;
    }
    else{humbug.innerHTML = `<i class="fa fa-bars"></i>`};
    
    humbugUl.classList.toggle("show-ul");
    humbug.classList.toggle("fa fa-caret-up");
})

// Light Mode ajuster////////////////////////////////////////
const lightMode = document.querySelector(".fa-adjust");
const webBody = document.querySelector(".bd");

document.addEventListener("DOMContentLoaded", ()=>{
    const savedMode = localStorage.getItem("lightMode");
    if(savedMode){
        webBody.className = savedMode;
    }
    
})

lightMode.addEventListener("click", ()=>{  

    webBody.classList.toggle("light-body");  

    localStorage.setItem("lightMode", webBody.className);
})