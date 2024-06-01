////// API KEK : d4beeb5a4amshafb9404318aea55p160adcjsnd5b90d233e8e
///// API KEY TMDB:ca1214b7a94c79e4f0f94346c8db8b70

// Mobile view port Menu////////////////////////////////////
const humbug = document.querySelector(".hambug");
const humbugUl = document.querySelector(".hambug-ul");

// Light Mode ajuster////////////////////////////////////////
const lightMode = document.querySelectorAll(".fa-adjust");
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

    document.querySelector(".infoPhrase").style.display = "none";

    const savedMode = localStorage.getItem("lightMode");
    if(savedMode){
        webBody.className = savedMode;
    }
    
})
lightMode.forEach(modes => {

    modes.addEventListener("click", ()=>{  

        webBody.classList.toggle("light-body");  
    
        localStorage.setItem("lightMode", webBody.className);
    })
});


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

        if(!req.ok || req == 400){
            alert("Error connecting!! \nPlease Check your internet connection");
        }
        const response = await req.json();
        console.log(response);

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
    infoPhrase.className = "infoPhrase";
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
            heroImage.loading = "lazy";
            console.log("clicked");
        })

        similarMovies.appendChild(simImg);
        
    }
}

// Genre part ////////////////////////////////////////
const homeGenre = document.querySelector(".genres");

const url = 'https://imdb8.p.rapidapi.com/title/list-popular-genres';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a8260f6512msh5aa686924dfe3fdp15bd85jsn6bfaac25d8fe',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function genrHome(){

    try {
        const response = await fetch(url, options);
        if(!response.ok){
            alert("Error in network connection!!!");
        }

        const result = await response.json();
        console.table(result);
        genHomeData(result);

    } catch (error) {
        console.error(error);
    }
    
}

genrHome();

function genHomeData(gens) {
    const gensDatasUnlocked = gens.genres;
    let previousClickedLi = null;

    gensDatasUnlocked.forEach((genName) => {
        
        let genLi = document.createElement("li");
        genLi.textContent = genName.description;


        homeGenre.appendChild(genLi);

        genLi.addEventListener("click", () => {
            similarMovies.innerHTML="";
            // Reset the style of the previously clicked li
            if (previousClickedLi) {
                previousClickedLi.style.fontWeight = "normal";
                previousClickedLi.style.color = "#655";
            }

            // Apply the new style to the clicked li
            genLi.style.fontWeight = "bolder";
            genLi.style.color = "white";

            // Update the previous clicked li
            previousClickedLi = genLi;
            tvMaizeData(genName.description);
     
        });
    });
}





