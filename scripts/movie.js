
////// API KEK : d4beeb5a4amshafb9404318aea55p160adcjsnd5b90d233e8e
///// API KEY TMDB:ca1214b7a94c79e4f0f94346c8db8b70

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
    document.querySelector(".infoPhrase").style.display = "none";

    const savedMode = localStorage.getItem("lightMode");
    if (savedMode) {
        webBody.className = savedMode;
    }
});
lightMode.forEach(modes => {
    modes.addEventListener("click", () => {
        webBody.classList.toggle("light-body");
        localStorage.setItem("lightMode", webBody.className);
    });
});

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

function moviesView(data) {
    if (data.length > 0 && data[0].show.image) {
        movieImage = data[0].show.image.original;
    } else {
        movieImage = "Images/placeholder.webp"; // Placeholder image if no image is available
    }

    movieHeroImageHolder.innerHTML = "";

    const heroImage = document.createElement("img");
    heroImage.src = movieImage;
    heroImage.alt = data[0].show.name;

    const infoHero = document.createElement("div");
    infoHero.className = "hero-info";

    const infoPhrase = document.createElement("p");
    infoPhrase.className = "infoPhrase";
    movieInfoz = data[0].show.summary.replace(/<\/?[^>]+(>|$)/g, "");

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.textContent = "More Info";

    // Info button
    moreInfoBtn.addEventListener("click", () => {
        if (!infoPhrase.style.display.includes("block")) {
            infoPhrase.textContent = "";
            infoPhrase.textContent = movieInfoz;
            infoPhrase.style.display = "block";
            infoPhrase.style.animation = "fade ease-in 2s";
        } else {
            infoPhrase.style.display = "none";
        }
    });

    infoHero.appendChild(infoPhrase);
    infoHero.appendChild(moreInfoBtn);

    movieHeroImageHolder.appendChild(heroImage);
    movieHeroImageHolder.appendChild(infoHero);

    for (let similarMovie of data) {
        if (similarMovie.show.image) {
            let srcSmilar = similarMovie.show.image.medium;
            let srcSmilarOrig = similarMovie.show.image.original;

            const simImg = document.createElement("img");
            simImg.src = srcSmilar;
            simImg.loading = "lazy";

            simImg.addEventListener("click", () => {
                heroImage.src = srcSmilarOrig;
                heroImage.loading = "lazy";
                console.log("clicked");
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
            // Update the hero image and info
            const firstShow = response[0];
            if (firstShow.show.image) {
                movieHeroImageHolder.innerHTML = `
                    <img src="${firstShow.show.image.original}" alt="${firstShow.show.name}">
                    <div class="hero-info">
                        <p>${firstShow.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                        <button>More Info!</button>
                    </div>`;
            } else {
                movieHeroImageHolder.innerHTML = `
                    <img src="Images/placeholder.webp" alt="No image available">
                    <div class="hero-info">
                        <p>${firstShow.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                        <button>More Info!</button>
                    </div>`;
            }
            // Update similar movies
            similarMovies.innerHTML = "";
            for (let similarMovie of response) {
                if (similarMovie.show.image) {
                    let srcSmilar = similarMovie.show.image.medium;
                    let srcSmilarOrig = similarMovie.show.image.original;

                    const simImg = document.createElement("img");
                    simImg.src = srcSmilar;
                    simImg.loading = "lazy";

                    simImg.addEventListener("click", () => {
                        movieHeroImageHolder.querySelector("img").src = srcSmilarOrig;
                        console.log("clicked");
                    });

                    similarMovies.appendChild(simImg);
                }
            }
        }
    } catch (error) {
        console.log("error found " + error);
    }
}


// Genre part
const url = 'https://imdb8.p.rapidapi.com/title/list-popular-genres';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a8260f6512msh5aa686924dfe3fdp15bd85jsn6bfaac25d8fe',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

async function genrHome() {
    try {
        const response = await fetch(url, options);
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
        genLi.textContent = genName.description;

        homeGenre.appendChild(genLi);

        genLi.addEventListener("click", () => {
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

            // Fetch movies of the clicked genre
            tvMaizeDataByGenre(genName.description);
        });
    });
}

// Popular Movies APIs
const popularImg = document.getElementById("popTrilar");
const youMayLike = document.getElementById("you-img");

const urlPopular = 'https://imdb8.p.rapidapi.com/title/v2/get-popular?first=20&country=US&language=en-US';
const optionsPopular = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a8260f6512msh5aa686924dfe3fdp15bd85jsn6bfaac25d8fe',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

async function popularApi() {
    try {
        const response = await fetch(urlPopular, optionsPopular);
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
    const popDataReultMovies = popDatas.data.movies.edges;
    const popDataReultTv = popDatas.data.tv.edges;

    for (let popMovie of popDataReultMovies) {
        let imgDiv = document.createElement("div");
        imgDiv.className = "img-div";
        imgDiv.style.backgroundImage = `url(${popMovie.node.primaryImage.url})`;
        imgDiv.loading = "lazy";

        // Getting genre name for movies
        let genInfo;

        const gnr = popMovie.node.titleGenres.genres;
        for (let gnrs of gnr) {
            genInfo = gnrs.genre.text;
        }
        imgDiv.innerHTML = `
            <div>
                <h4 class="title"><span style="color: goldenrod; font-weight:Bolder;">Title</span>: ${popMovie.node.originalTitleText.text}</h4>
                <h5 class="title-gn"><span>Genre</span>: ${genInfo}</h5>
                <i class="title-info fa fa-info-circle">Year: ${popMovie.node.releaseYear.year}<br> Ratings: ${popMovie.node.ratingsSummary.aggregateRating}</i>
           </div>`;

        popularImg.appendChild(imgDiv);

        // You may like more pics
        let youPics2 = document.createElement("img");
        youPics2.src = popMovie.node.primaryImage.url;
        youMayLike.appendChild(youPics2);
    }

    for (let youLike of popDataReultTv) {
        let youPics = document.createElement("img");
        youPics.src = youLike.node.primaryImage.url;
        youMayLike.appendChild(youPics);
    }
}

popularApi();
