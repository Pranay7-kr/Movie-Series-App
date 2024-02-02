var getFavItem = JSON.parse(localStorage.getItem("favouriteItem"));  // Is used for get the result from local storage



let favHero = document.querySelector(".favHero");  // Is used for to put the results

// created renderItems function to put the result in my favHero InnerHTML

const renderItems=()=>{

    if(getFavItem!==null){
    const favData = getFavItem.map((item,index)=>{
        return  `
        <div class="card-container">
        <div class ="hero-name">${item.Title}</div>
<div class="img-section">
    <img src="${item.Poster}" alt="">                  
</div>
<div class="remove-part">
    <button class = "removeButton" onclick = "removeFavourite(${index})">Remove</button>
</div>
</div>
`;
        
    }).join();

    favHero.innerHTML = favData;
}
else{
    return;
}
}

renderItems();

// we used removeFavourite to remove the specific data which user want.

const removeFavourite=(index)=>{
    getFavItem.splice(index,1);
    localStorage.setItem("favouriteItem", JSON.stringify(getFavItem));
    renderItems();
    
}