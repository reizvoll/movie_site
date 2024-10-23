import { movies } from './api_ui.js';

const modalWindow = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal_close_btn");
const general = document.getElementById("movie_container");

function modalMovies(movie) {
    document.querySelector(".modal_title").textContent = movie.title;
    document.querySelector(".modal_comment").textContent = movie.overview;
    document.querySelector(".modal_date").textContent = `개봉일 - ${movie.release_date}`;
    // Math.floor() 지대로 작성 안한 림졍 반성하자.
    document.querySelector(".modal_rating").textContent = `평점 - ${Math.floor(movie.vote_average * 10) / 10}`;
    document.querySelector(".modal_img_item").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}


general.addEventListener("click", (e) => {
    const clickCard = e.target.closest(".card_img_box");

    if (clickCard) {
        const clickMovieId = parseInt(clickCard.getAttribute("data-id"));
        const selectMovie = movies.find((movie) => movie.id === clickMovieId);

        if (selectMovie) {
            modalMovies(selectMovie);
            modalWindow.style.display = "block";
        }
    }
});

closeBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
});
