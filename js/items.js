const listItem = document.getElementById("list-items");
let i = 0;

// creates new stock card
const addItemCard = () => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", i);
  listItem.appendChild(newDiv);
  newDiv.innerHTML = `<br>
    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
  i++;
};


// loads item from local storage
const loadItemsFromLocalStorage = () => {
    const storageItems = localStorage.getItem("stocks");
    if (storageItems) {
        const stocksArr = JSON.parse(storageItems);
        return stocksArr;
    }
    
};

console.log(loadItemsFromLocalStorage());

addItemCard();
addItemCard();
addItemCard();
