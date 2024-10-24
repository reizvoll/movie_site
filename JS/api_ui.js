const apiUrl ='https://api.themoviedb.org/3/movie/popular?language=ko-KO&page=1';
const authorCode = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yjk4ZTQyMThlMzkyNGRiMjUxZjBhZjk4MzQxOTk5MSIsIm5iZiI6MTcyOTYwNzE0NS44NDg2NDUsInN1YiI6IjY3MTBhMjQxMWI5MTJhZGQyZWRiYzQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EYAopR__eVlQwIQfH3t_55jSRozEIiWFt2Sra-Vg8LQ'

let movies = [];
export { movies }; 
const rates = document.querySelector(".modal_info_rating");
const general = document.getElementById("movie_container");
const searchInput = document.querySelector("#query");
const searchBtn = document.querySelector(".search_btn");
const resetBtn = document.querySelector(".reset_btn")

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: authorCode
            },
        });
        const data = await response.json();
        console.log(data);
        movies = data.results;
        displayMovie(movies);
    } catch (error) {
        console.error("오류! 오류! : ", error);
    }
}

async function searchMovie () {
  const searchUrl=`https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false&language=ko-KR&page=1`
  try {
    const response = await fetch (searchUrl,{
      method: "GET",
      headers : {
        accept : "application/json",
        Authorization: authorCode
      },
    });
    const data = await response.json();
    movies = data.results;
    displayMovie(movies);
  } catch (error) {
    console.error ("오류! 오류! : ", error);
  }
}

function displayMovie(display) {
  general.innerHTML = "";
  display.forEach((movie) => {
      const movieElementHTML = `
      <div class="cards">
      <div class="card_img_box" data-id="${movie.id}">
        <img
          class="card_img_item"
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title}"
        />
      </div>
      <div class="card_title_box">
        <span class="card_movie_title"> ${movie.title} </span>
        <div class="card_info_box">
          <span class="modal_info_date"> 개봉일 - ${movie.release_date} </span>
          <br>
          <span class="card_info_rating"> 평점 - ${Math.floor(movie.vote_average * 10) / 10} </span>
        </div>
      </div>
      <div class="overview"> 
      <p class="modal_info_comment"> ${movie.overview} </p> 
      </div>
      </div>
    `;
      general.innerHTML += movieElementHTML;
  });
}

searchBtn.addEventListener("click", () => {
  searchMovie();
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchMovies();
});

fetchMovies();