const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmIzZGQ3ZGU2Njc5NTk5OTAxMTMzOWNhNzUxY2I5MCIsInN1YiI6IjY0NzA4N2FlNzI2ZmIxMDBhOGIyMmZhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSAN93Gbmt8oSolnHsRPRXUHuY_BiV5NdCMOSAKK3sA'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    let moviedata = data.results;
    moviedata.forEach(a => {
      let id = a.id;
      let title = a.title;
      let plot = a.overview;
      let image = a.poster_path;
      let rate = a.vote_average;

      const movieElement = document.createElement("div");
      movieElement.className = "movie-container";
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200/${image}" class="movie-image" id="${id}">
        <div class="movie-details">
          <h3>기본정보</h3>
          <h4>${title}</h4>
          <p id ="list">&lt;내용&gt;</p>
          <p>${plot}</p>
          <p><span>평점 : </span>${rate}</p>
        </div>
      `;

      document.querySelector(".movie-card").appendChild(movieElement);

      let movieImage = document.getElementById(`${id}`);

      movieImage.addEventListener('click', () => {
        alert(`ID: ${id}`);
      });
    });
  });

function searchMovies(event) {
  event.preventDefault();

  // 입력된 검색어 가져오기
  const input = document.getElementById("search");
  const results = input.value.toLowerCase();

  const movieElements = document.getElementsByClassName("movie-container");

  for (let i = 0; i < movieElements.length; i++) {
    const title = movieElements[i].querySelector("h4");
    const titleText = title.innerText || title.textContent;

    // 검색어가 포함된 영화 제목이 있다면 표시, 아니면 숨김
    if (titleText.toLowerCase().includes(results)) {
      movieElements[i].style.display = "";
    } else {
      movieElements[i].style.display = "none";
    }
  }
}

const searchButton = document.getElementById("btn");
searchButton.addEventListener('click', searchMovies);