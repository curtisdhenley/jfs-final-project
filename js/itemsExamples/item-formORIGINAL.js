const jess = new ItemsController();

let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
  // <form action="/action_page.php">
  //     <label for="imgURL">Image URL</label><br>
  //     <input type="text" id="img" name="img" placeholder="http://www.img.png"><br><br>
  //     <label for="symbol">Ticker Symbol</label><br>
  //     <input type="text" id="symbol" name="symbol" placeholder="META"><br><br>
  //     <label for="price">Stock Price</label><br>
  //     <input type="text" id="price" name="price" placeholder="100.00"><br><br>
  //     <input type="submit" id="submitBtn" value="Submit">
  //   </form>

  event.preventDefault();

  let imgURL = document.getElementById("imgURL");
  let symbol = document.getElementById("symbol");
  let price = document.getElementById("price");

  // gearManager.addGear(gearURL.value, gearCategory.value, gearType.value, gearPrice.value);
  // bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

  jess.addItem(imgURL.value, symbol.value, price.value, jess.currentTime());

  // localStorage.setItem("classID", JSON.stringify(bob.currentID));
  // localStorage.setItem("stocks", JSON.stringify(bob.items));

  localStorage.setItem("classID", JSON.stringify(jess.currentID));
  localStorage.setItem("stocks", JSON.stringify(jess.items));

  renderListFromLocal();

  gearPrice.value = "";
  gearCategory.value = "";
  gearType.value = "";
  gearURL.value = "";
});

// gearManager.setLocalStorage();

//**** we need to come back ****
// gearRows.innerHTML = '';

// ***
// instead of render list we'll render cards
// ***
const renderListFromLocal = () => {
  // we want to loop through our array and display each item by adding it to our last
  //***Come back b/c there no such thing as loadlocalstorage*** /
  jess.loadLocalStorage();
  let stocks = jess.items;

  for (let i = 0; i < stocks.length; i++) {
    // row aren't displaying on the page. Clear local storage and give it a real image.
    let newRow = document.createElement("tr");
    newRow.setAttribute("data-id", stocks[i].id);
    newRow.innerHTML = `
        <th scope="row"><img class="img-thumbnail" src="${stocks[i].url}"></th>
        <td>${stocks[i].type}</td>
        <td>${stocks[i].category}</td>
        <td>${stocks[i].price}</td>`;
    gearRowsTable.append(newRow);
  }
};

// ***
// first try
// ***

//    const addItemCards = () => {

//           const stocksArr = loadItemsFromLocalStorage();

//           console.log(stocksArr);

//           for (let i = 0; i < stocksArr.length; i++) {
//             console.log(`i is ${i}`);
//             const newDiv = document.createElement("div");
//             newDiv.setAttribute("id", i);
//             listItem.appendChild(newDiv);
//             newDiv.innerHTML = `<br>
//               <div class="card" style="width: 18rem;">
//               <img src="${stocksArr[i].img}" class="card-img-top" alt="...">
//               <div class="card-body">
//                 <h5 class="card-title">${stocksArr[i].symbol}</h5>
//                 <p class="card-text">Latest price: ${stocksArr[i].price}</p>
//                 <a href="#" class="btn btn-primary">Go somewhere</a>
//               </div>
//             </div>`;
//           }
//       };

// ***
// second try
// ***

// get array of stocks and display them
const addItemCards = () => {
  const stocksJSON = localStorage.getItem("stocks");

  if (stocksJSON) {
    const stocksArr = JSON.parse(stocksJSON);

    console.log(stocksArr);

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
  }
};
