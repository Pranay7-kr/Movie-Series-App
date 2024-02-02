
var favItem = [];  //create an empty array 



var getFavItem = JSON.parse(localStorage.getItem("favouriteItem")); //get favorite items from local storage and parse it as JSON

favItem = getFavItem ? [...getFavItem] : [];

let input = document.getElementById("input-box");  // get the search item value from the input field.
let button = document.getElementById("submit-button");  // click on submit button to get the result.
let showContainer = document.getElementById("show-container");  // Is used for to put result
let listContainer = document.querySelector(".list");



function displayWords(value){
    input.value = value;
    removeElements();
  }
  
function removeElements() {
    listContainer.innerHTML = "";
  }


  input.addEventListener("keyup", async ()=>{
    if (input.value.length < 4) {
      listContainer.innerHTML = "";
      return false;
    }
  
    const url = `http://www.omdbapi.com/?apikey=8e5546fe&s=${input.value}`;
    const response = await fetch(url);
    const listData =  response.json();
    listData.then((res)=>{
        res.Search.forEach((result)=>{
            let title = result.Title;
            let div = document.createElement("div");
            div.style.cursor = "pointer";
            div.classList.add("autocomplete-items");
            div.setAttribute("onclick", "displayWords('" + title + "')");
            let word = "<b>" + title.substr(0, input.value.length) + "</b>";
            word += title.substr(input.value.length);
            div.innerHTML = `<p class="item">${word}</p>`;
            listContainer.appendChild(div);
        });
    });
  
  });

  // create an asynchronous function to fetch data from API

button.addEventListener("click",(getResult = async ()=>{


    showContainer.innerHTML = "";
    listContainer.innerHTML = "";

    const url = `http://www.omdbapi.com/?apikey=8e5546fe&s=${input.value}`;
    const response = await fetch(url);
    const jsonData = response.json();
    jsonData.then((res)=>{
        if(res.Response=="True"){
            const filteredData = favItem.filter(
                (item) => item.imdbID === res.Search[0].imdbID);

                data = res.Search[0].imdbID;
                console.log(data);

            if(filteredData.length>0){
                showContainer.innerHTML = `
           <div class="card-container">
         <div class="container-character-image">
         <img src="${res.Search[0].Poster}"></div>
         <div class="character-name">${res.Search[0].Title}: ${res.Search[0].imdbID}</div>
         <div class="info-fav">
         <button id="information">More Info</button>
         <button id="addToFav" disabled = "true">Already Added</button>
         </div>
         </div>
           `;
            }
            else{
                showContainer.innerHTML = `
           <div class="card-container">
         <div class="container-character-image">
         <img src="${res.Search[0].Poster}"></div>
         <div class="character-name">${res.Search[0].Title}: ${res.Search[0].imdbID}</div>
         <div class="info-fav">
         <button id="information">More Info</button>
         <button id="addToFav">Add To Favourite</button>
         </div>
         </div>
           `;
            }
          }
          else{
            showContainer.innerHTML = "Match not Found!!";
            showContainer.style.color = "white";
            showContainer.style.textAlign = "center"
            return;
          }
    })
}));

async function handleButton(e){
    if(e.target.id === "submit-button"){
        getResult();
        console.log(e.target.id);
    }
    else if(e.target.id === "information"){
      console.log("Button clicked");
      localStorage.setItem("informationItem",`${data}`);
      window.location.href = "more-info.html";
    }
    else if(e.target.id ==="addToFav"){
      const url = `http://www.omdbapi.com/?apikey=8e5546fe&i=${data}`;
      const jsonData = await fetch(url);
      const response = jsonData.json();
      response.then((res)=>{
        // console.log(res);
        favItem.push(res);
        localStorage.setItem("favouriteItem", JSON.stringify(favItem));
        const filteredData = favItem.filter(
          (item) => item.imdbID === res.imdbID
        );

        if (filteredData.length > 0) {
          e.target.innerHTML = "Already Added";
          e.target.disabled = true;
          
        } else {
          e.target.innerHTML = "Add to favorites";
          e.target.disabled = false;
          
        }
      })
    }
    else{
        return;
    }
}

// handle a button where u clicked

document.addEventListener('click',handleButton);