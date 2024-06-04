
//// MY json file path : https://nwaxon2020.github.io/semester-project-2024/newMovies.json

// Mobile view port Menu
const humbug = document.querySelector(".hambug");
const humbugUl = document.querySelector(".hambug-ul");

// Light Mode ajuster
const lightMode = document.querySelectorAll(".fa-adjust");
const webBody = document.querySelector(".bd");

// Input for search
const formSrc = document.querySelectorAll(".serchForm");
const resultFromSearchDiv = document.getElementById("Search-reslt");

// Hero Image
const movieHeroImageHolder = document.querySelector(".movie-hero-image");
let movieImage = "Images/test picture.webp";
let movieInfoz = "Find Your Best Movies and Tv series with us today and always. Never miss out on your favourite shows any day, anytime. We got you covered!!!";

// Similar Images to Hero Image
const similarMovies = document.querySelector(".triler-img");

// Genre part
const homeGenre = document.querySelector(".genres");

// Mobile view port Menu
humbug.addEventListener("click", () => {
    if (humbug.innerHTML == `<i class="fa fa-bars"></i>`) {
        humbug.innerHTML = `<i class="fa fa-caret-up"></i>`;
    } else { humbug.innerHTML = `<i class="fa fa-bars"></i>`; }

    humbugUl.classList.toggle("show-ul");
    humbug.classList.toggle("fa fa-caret-up");
});

// Light Mode ajuster
document.addEventListener("DOMContentLoaded", () => {
    const savedMode = localStorage.getItem("lightMode");
    if (savedMode) {
        webBody.className = savedMode;
    } else {
        // Set default mode if not found in local storage
        webBody.className = "dark-body"; // Change this to your default mode
    }
    // Update colors based on the current mode
    updateColors();
});

lightMode.forEach(modes => {
    modes.addEventListener("click", () => {
        webBody.classList.toggle("light-body");
        webBody.classList.toggle("dark-body"); // Toggle between light and dark mode classes
        localStorage.setItem("lightMode", webBody.className);
        // Update colors based on the current mode
        updateColors();
    });
});

// Function to update colors based on the current mode
function updateColors() {
    if (webBody.classList.contains("light-body")) {
        homeGenre.style.color = "#000"; // Set color for light mode
    } else {
        homeGenre.style.color = "#fff"; // Set color for dark mode
    }
}


// Input for search
formSrc.forEach(form => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputReq = form.querySelector("input").value;
        tvMaizeData(inputReq);
        movieHeroImageHolder.style.animation = "fade 2s ease-in";
        similarMovies.innerHTML = "";
    });
});

async function tvMaizeData(searchInputRequest) {
    try {
        const req = await fetch(`https://api.tvmaze.com/search/shows?q=${searchInputRequest}`);
        if (!req.ok) {
            alert("Error connecting!! \nPlease Check your internet connection");
            return;
        }
        const response = await req.json();
        console.log(response);
        moviesView(response);
    } catch (error) {
        console.log("error found " + error);
    }
}

// Hero Image
movieHeroImageHolder.innerHTML = `
<img src="Images/test picture.webp" alt="game of thrones">
<div class="hero-info">
    <p>
        ${movieInfoz}
    </p>
    <button>More Info!</button>
</div>`;


// Hero Image
let currentShow = null;

function moviesView(data) {
    if (data.length > 0 && data[0].show.image) {
        currentShow = data[0].show;
        movieImage = data[0].show.image.original;
    } else {
        currentShow = null;
        movieImage = "Images/placeholder.webp"; // Placeholder image if no image is available
    }

    movieHeroImageHolder.innerHTML = "";

    const heroImage = document.createElement("img");
    heroImage.src = movieImage;
    heroImage.alt = currentShow ? currentShow.name : "";

    const infoHero = document.createElement("div");
    infoHero.className = "hero-info";

    const infoPhrase = document.createElement("p");
    infoPhrase.className = "infoPhrase";
    movieInfoz = currentShow ? currentShow.summary.replace(/<\/?[^>]+(>|$)/g, "") : "";

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";

    let infoVisible = false;

    // Info button
    moreInfoBtn.addEventListener("click", () => {
        if (!infoVisible) {
            infoPhrase.textContent = movieInfoz;
            infoPhrase.style.display = "block";
            infoVisible = true;
            moreInfoBtn.textContent = "Hide Info";
        } else {
            infoPhrase.style.display = "none";
            infoVisible = false;
            moreInfoBtn.textContent = "More Info";
        }
    });

    infoHero.appendChild(infoPhrase);
    infoHero.appendChild(moreInfoBtn);

    movieHeroImageHolder.appendChild(heroImage);
    movieHeroImageHolder.appendChild(infoHero);

    // Clear similar movies
    similarMovies.innerHTML = "";

    for (let similarMovie of data) {
        if (similarMovie.show.image) {
            let srcSimilar = similarMovie.show.image.medium;
            let srcSimilarOrig = similarMovie.show.image.original;

            const simImg = document.createElement("img");
            simImg.src = srcSimilar;
            simImg.loading = "lazy";

            simImg.addEventListener("click", () => {
                currentShow = similarMovie.show;
                heroImage.src = srcSimilarOrig;
                heroImage.loading = "lazy";
                movieInfoz = currentShow ? currentShow.summary.replace(/<\/?[^>]+(>|$)/g, "") : "";
                infoPhrase.textContent = movieInfoz;
            });

            similarMovies.appendChild(simImg);
        }
    }
}

async function tvMaizeDataByGenre(genre) {
    try {
        const req = await fetch(`https://api.tvmaze.com/search/shows?q=${genre}`);
        if (!req.ok) {
            alert("Error connecting!! \nPlease Check your internet connection");
            return;
        }
        const response = await req.json();
        console.log(response);
        if (response.length > 0) {
            moviesView(response);
        }
    } catch (error) {
        console.log("error found " + error);
    }
}



// Genre part //////////////////////////////////////
const apiKey = 'ca1214b7a94c79e4f0f94346c8db8b70'; // Your TMDB API Key
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

async function genrHome() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Error in network connection!!!");
            return;
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
        genLi.textContent = genName.name;

        homeGenre.appendChild(genLi);

        genLi.addEventListener("click", async () => {
            // Reset the style of the previously clicked li
            if (previousClickedLi) {
                previousClickedLi.style.fontWeight = "normal";
                previousClickedLi.style.color = "#665";
            }

            // Apply the new style to the clicked li
            genLi.style.fontWeight = "bolder";
            if(webBody.classList.contains("light-body")){
                genLi.style.color = "Black";
            }else{
                genLi.style.color = "white";
            }

            // Update the previous clicked li
            previousClickedLi = genLi;

            // Fetch TV shows of the clicked genre
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genName.id}`);
                if (!response.ok) {
                    throw new Error("Error fetching TV shows by genre");
                }
                const data = await response.json();
                const tvShows = data.results.map(show => ({
                    show: {
                        id: show.id,
                        name: show.name,
                        image: {
                            original: `https://image.tmdb.org/t/p/original${show.poster_path}`,
                            medium: `https://image.tmdb.org/t/p/w500${show.poster_path}`
                        },
                        summary: show.overview
                    }
                }));
                moviesView(tvShows);
            } catch (error) {
                console.error("Error:", error);
                // Handle error
            }
        });
    });
}


// popular Movies ////////////////////////////////////////
const popularImg = document.getElementById("popTrilar");

const urlPopular = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;

async function popularApi() {
    try {
        const response = await fetch(urlPopular);
        if (!response.ok) {
            alert("No internet");
        }
        const result = await response.json();
        popData(result);
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}

function popData(popDatas) {
    const popDataReultMovies = popDatas.results;
    
    for (let popMovie of popDataReultMovies) {
        let imgDiv = document.createElement("div");
        imgDiv.className = "img-div";
        imgDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${popMovie.poster_path})`;
        imgDiv.loading = "lazy";

        imgDiv.innerHTML = `
            <div>
                <h4 class="title"><span style="color: goldenrod; font-weight:Bolder;">Title</span>: ${popMovie.title}</h4>
                <h5 class="title-gn"><span>Genre</span>: ${popMovie.genre_ids}</h5>
                <h6>Release date: ${popMovie.release_date}<br> Ratings: ${popMovie.vote_average}</h6>
           </div>`;

        popularImg.appendChild(imgDiv);

        let youPics = document.createElement("img");
        youPics.src = `https://image.tmdb.org/t/p/w500/${popMovie.poster_path}`;

        youMayLike.appendChild(youPics);
    }
}


// You may Like ///////////////////////////////////
const youMayLike = document.getElementById("you-img");

const urlYouMayLike = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${apiKey}`;

async function youMayLikeApi() {
    try {
        const response = await fetch(urlYouMayLike);
        if (!response.ok) {
            alert("No internet");
        }
        const result = await response.json();
        youData(result);
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}

function youData(youDatas){
    const popDataReultTv = youDatas.results;

    for (let youLike of popDataReultTv) {
        let youPics = document.createElement("img");
        youPics.src = `https://image.tmdb.org/t/p/w500/${youLike.poster_path}`;

        youMayLike.appendChild(youPics);
    }

    popularApi();
}

youMayLikeApi();
