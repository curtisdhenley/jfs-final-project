const listItem = document.getElementById("list-items");

// creates new stock card
// const addItemCard = () => {
//   const newDiv = document.createElement("div");
//   newDiv.setAttribute("id", i);
//   listItem.appendChild(newDiv);
//   newDiv.innerHTML = `<br>
//     <div class="card" style="width: 18rem;">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">Card title</h5>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//       <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </div>`;
//   i++;
// };

// creates new stock card
const addItemCards = () => {
  const stockFromStorage = loadItemsFromLocalStorage();

  console.log(stockFromStorage);

  // code happens here
  // console.log(`i is ${i}`);
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", stockFromStorage.phone);
  listItem.appendChild(newDiv);
  newDiv.innerHTML = `<br>
  <div class="card" style="width: 18rem;">
  <img src="${stockFromStorage.logo}" class="card-img-top" alt="picture of person">
  <div class="card-body">
    <h3>${stockFromStorage.name} ${stockFromStorage.ticker}</h3>
    <p class="card-text">${stockFromStorage.weburl}</p>
  </div>
</div>`;
};

// loads item from local storage
const loadItemsFromLocalStorage = () => {
  const storageItems = localStorage.getItem("stockData");
  if (storageItems) {
    const stockObj = JSON.parse(storageItems);
    return stockObj;
  }
};

// console.log(loadItemsFromLocalStorage());

addItemCards();
