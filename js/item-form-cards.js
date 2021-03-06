import {ItemsController} from "./itemsController.js"

const jess = new ItemsController();



let submitBtn = document.getElementById("submitBtn");
let listItem = document.getElementById("list-items");

// get array of stocks and display them
const addItemCards = () => {

  // change to get API sourced stock data
    const stocksJSON = localStorage.getItem("stocks");

    // if (stocksJSON) {
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
    // }
  };

  // may need to emulate following code
//   if(localStorage.getItem("stocks")){
//     jess.loadLocalStorage();
//     addItemCards();
//   }

submitBtn.addEventListener("click", function (event) {

  event.preventDefault();

  let imgURL = document.getElementById("imgURL");
  let symbol = document.getElementById("symbol");
  let price = document.getElementById("price");

  // gearManager.addGear(gearURL.value, gearCategory.value, gearType.value, gearPrice.value);
  // bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

  jess.addItem(imgURL.value, symbol.value, price.value, jess.currentTime());

  // gearManager.setLocalStorage();
  localStorage.setItem("classID", JSON.stringify(jess.currentID));
  localStorage.setItem("stocks", JSON.stringify(jess.items));  

//**** we need to come back ****
// gearRows.innerHTML = '';

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = '';
  addItemCards();

  imgURL.value = "";
  symbol.value = "";
  price.value = "";
  
});



// ***
// instead of render list we'll render cards
// ***
// const renderListFromLocal = () => {
//   // we want to loop through our array and display each item by adding it to our last
//   //***Come back b/c there no such thing as loadlocalstorage *** /
//   jess.loadLocalStorage();
//   let stocks = jess.items;

//   for (let i = 0; i < stocks.length; i++) {
//     // row aren't displaying on the page. Clear local storage and give it a real image.
//     let newRow = document.createElement("tr");
//     newRow.setAttribute("data-id", stocks[i].id);
//     newRow.innerHTML = `
//         <th scope="row"><img class="img-thumbnail" src="${stocks[i].url}"></th>
//         <td>${stocks[i].type}</td>
//         <td>${stocks[i].category}</td>
//         <td>${stocks[i].price}</td>`;
//     gearRowsTable.append(newRow);
//   }
// };


