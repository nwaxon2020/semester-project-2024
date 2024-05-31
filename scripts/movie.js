// Mobile view port Menu////////////////////////////////////
const humbug = document.querySelector(".hambug");
const humbugUl = document.querySelector(".hambug-ul");

// Light Mode ajuster////////////////////////////////////////
const lightMode = document.querySelector(".fa-adjust");
const webBody = document.querySelector(".bd");

// Input for search /////////////////////////////////////////
const formSrc = document.querySelectorAll(".serchForm");
const resultFromSearchDiv = document.getElementById("Search-reslt");

// Hero Image ///////////////////////////////////////
const movieHeroImageHolder = document.querySelector(".movie-hero-image");
let movieImage = "Images/test picture.webp";

// Similar Images to Hero Image ////////////////////////////
const similarMovies = document.querySelector(".triler-img");



// Mobile view port Menu////////////////////////////////////
humbug.addEventListener("click", ()=>{
    if(humbug.innerHTML == `<i class="fa fa-bars"></i>`){
        humbug.innerHTML = `<i class="fa fa-caret-up"></i>`;
    }
    else{humbug.innerHTML = `<i class="fa fa-bars"></i>`};
    
    humbugUl.classList.toggle("show-ul");
    humbug.classList.toggle("fa fa-caret-up");
})

// Light Mode ajuster////////////////////////////////////////
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

// Input for search /////////////////////////////////////////
formSrc.forEach(form => {
    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        let inputReq = form.querySelector("input").value;
      
        dataSrc = tvMaizeData(inputReq);

        movieHeroImageHolder.style.animation = "fade 2s ease-in";
        similarMovies.innerHTML ="";
    })
});

async function tvMaizeData(searchInputRequest){

    try {
        const req = await fetch(`https://api.tvmaze.com/search/shows?q=${searchInputRequest}`);

        if(!req.ok){
            alert("Error connecting!! \nPlease Check your internet connection");
        }
        const response = await req.json();
        console.table(response);

        moviesView(response);

    } catch (error) {
        console.log("error found " + error);
    }
}

// Hero Image ///////////////////////////////////////
movieHeroImageHolder.innerHTML =`
<img src="Images/test picture.webp" alt="game of thrones">
<div class="hero-info">
    <p>
        Find Your Best Movies and Tv series with us today and always. Never miss out on your favourite shows any day, anytime. Wegot you covered!!!
    </p>
    <button>More Info!</button>
</div>`

function moviesView(data){

    movieImage = data[0].show.image.original; 

    const heroImage = document.createElement("img");
    heroImage.src = movieImage;

    const infoHero = document.createElement("div");
    infoHero.className = "hero-info";

    const infoPhrase = document.createElement("p");
    infoPhrase.textContent = "Hhelloooooooooooo"

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";


    infoHero.appendChild(infoPhrase);
    infoHero.appendChild(moreInfoBtn);

    movieHeroImageHolder.innerHTML="";
    movieHeroImageHolder.appendChild(heroImage);
    movieHeroImageHolder.appendChild(infoHero);

    for(let similarMovie of data){

        let srcSmilar = similarMovie.show.image.medium;
        let srcSmilarOrig = similarMovie.show.image.original;
        
        const simImg = document.createElement("img");
        simImg.src = srcSmilar;
        simImg.loading = "lazy";

        simImg.addEventListener("click", ()=>{
            
            heroImage.src = srcSmilarOrig;
            heroImage.loadingm = "lazy";
            console.log("clicked");
        })

        similarMovies.appendChild(simImg);
        
    }

    // const axios = require('axios');

    // const options = {
    // method: 'GET',
    // url: 'https://streaming-availability.p.rapidapi.com/genres',
    // params: {
    //     output_language: 'en'
    // },
    // headers: {
    //     'X-RapidAPI-Key': 'a8260f6512msh5aa686924dfe3fdp15bd85jsn6bfaac25d8fe',
    //     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    // }
    // };

    // try {
    //     const response = await axios.request(options);
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

}

