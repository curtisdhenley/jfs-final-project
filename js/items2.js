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


  // get array of stocks - replacing with function call
  // const stocksJSON = localStorage.getItem("stocks");



  // console.log(storageItems);
  // if (stocksJSON) {
    // taken care of by loadItemsFromLocalStorage
    // const stocksArr = JSON.parse(stocksJSON);

    const stocksArr = loadItemsFromLocalStorage();

    console.log(stocksArr);
    // console.log(stocksObj.items);

    // const stocksArr = stocksObj.items;

    // code happens here
    for (let i = 0; i < stocksArr.length; i++) {
      console.log(`i is ${i}`);
      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", i);
      listItem.appendChild(newDiv);
      newDiv.innerHTML = `<br>
        <div class="card" style="width: 18rem;">
        <img src="${stocksArr[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${stocksArr[i].symbol}</h5>
          <p class="card-text">Latest price: ${stocksArr[i].price}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`;
    }
  // }
};

// loads item from local storage
const loadItemsFromLocalStorage = () => {
  const storageItems = localStorage.getItem("stocks");
  if (storageItems) {
    const stocksArr = JSON.parse(storageItems);
    return stocksArr;
  }
};

// console.log(loadItemsFromLocalStorage());

addItemCards();
