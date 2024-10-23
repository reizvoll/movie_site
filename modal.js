import { movies } from './api_ui.js';

const modalWindow = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal_close_btn");
const general = document.getElementById("movie_container");
const wholeCards = document.querySelector(".modal_img_box");
const background = document.querySelector(".background_color");

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
            openModal();
        }
    }
});

closeBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
});

function openModal() {
    modalWindow.classList.add("show");
    background.classList.add("show");
    general.style.pointerEvents = "none"; // 모달 외부 클릭 방지
}

function closeModal() {
    modalWindow.classList.remove("show");
    background.classList.remove("show");
    general.style.pointerEvents = "auto"; // 모달 외부 클릭 가능하게
}

// 모달 닫기 버튼 클릭 시
closeBtn.addEventListener("click", closeModal);

// 배경 클릭 시 모달 닫기
background.addEventListener("click", function() {
    console.log('배경이 클릭됨'); // 배경이 클릭되는지 확인
    closeModal(); // 모달 닫기
});
