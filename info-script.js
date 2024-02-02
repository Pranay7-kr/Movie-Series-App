var getInfoItem = localStorage.getItem("informationItem"); // Is used for get the result from local storage


let infoContainer = document.querySelector(".info");   // Is used for to put the results

 // created information function to put the result in my information part

async function information(){
    const url = `http://www.omdbapi.com/?apikey=8e5546fe&i=${getInfoItem}&plot=full&tomatoes=true`;
    const jsonData = await fetch(url);
    const response = jsonData.json();
    response.then((res)=>{
        console.log(res);
        
        const movieDetailsHtml = `
              <div class="movie-details-wrapper">
                <h1>${res.Title}</h1>
                <img src="${res.Poster}">
                <table>
                <tr><th>Year:</th> <td>${res.Year}</td></tr>
                <tr><th>Rated:</th> <td>${res.Rated}</td></tr>
                <tr><th>Released:</th> <td> ${res.Released}</td></tr>
                <tr><th>Runtime:</th> <td>${res.Runtime}</td></tr>
                <tr><th>Genre:</th> <td>${res.Genre}</td></tr>
                <tr><th>Director:</th> <td>${res.Director}</td></tr>
                <tr><th>Writer:</th> <td>${res.Writer}</td></tr>
                <tr><th>Actors:</th> <td>${res.Actors}</td></tr>
                <tr><th>Plot:</th> <td>${res.Plot}</td></tr>
                <tr><th>Language:</th> <td>${res.Language}</td></tr>
                <tr><th>Country:</th> <td>${res.Country}</td></tr>
                <tr><th>Awards:</th> <td>${res.Awards}</td></tr>
                <tr><th>IMDb Rating:</th> <td>${res.imdbRating}</td></tr>
                <tr><th>IMDb Votes:</th> <td>${res.imdbVotes}</td></tr>
                <tr><th>Type:</th> <td>${res.Type}</td></tr>
                <tr><th>DVD:</th> <td>${res.DVD}</td></tr>
                <tr><th>BoxOffice:</th> <td>${res.BoxOffice}</td></tr>
                </table>
              </div>
            `;

            infoContainer.innerHTML = movieDetailsHtml;
    })
}


window.onload=()=>{
    information();
}