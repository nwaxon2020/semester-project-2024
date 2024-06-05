const form = document.querySelector(".regForm");

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    const fromData = new FormData(form);
    
    for(let[name, value] of fromData){

        console.log(name, value);
    }
})