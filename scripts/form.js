const form = document.querySelector(".regForm");

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const fromData = new FormData(form);
    
    for(let[name, value] of fromData){

        console.log(name, value);
    }

    try {

        const dataReq = await fetch("#url", {method: "POST", body: fromData});
        if (!dataReq.ok){alert("Error in connection!")};

        const response = await dataReq.json();
        console.log(response);
        
    } catch (error) {
        
    }
})
