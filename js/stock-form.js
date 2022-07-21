import { StocksController } from "./stocksController.js";

const jess = new StocksController();

let submitBtn = document.getElementById("submitBtn");
let listItem = document.getElementById("list-items");
let symbol = "Default symbol";
let price = "Default price";
let quantity = "Default quantity";
let holdingId = "Default holding ID";
let apiStockLogoUrl = "Default API Logo";
let apiStockQuoteUrl = "Default API Quote";

// get array of stocks and display them
const addItemCards = () => {
  const stocksJSON = localStorage.getItem("stocks");

  const stocksArr = JSON.parse(stocksJSON);
  // loop iterates through local storage and rebuilds html to make list of stocks
  for (let i = 0; i < stocksArr.length; i++) {
    console.log(`i is ${i}`);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row"><img class="img-thumbnail" src="${stocksArr[i].img}" style="height: 50px;"></th>
        <td>${stocksArr[i].symbol.toUpperCase()}</td>
        <td>${stocksArr[i].price}</td>`;
    listItem.appendChild(newRow);
  }
};

const makeRequest1 = async () => {
  let response = await fetch(apiStockLogoUrl);
  let stockJson = response.json();

  // if the response is bad
  if (!response.ok) {
    console.log(`${symbol.value} is not a valid ticker symbol`);
    throw new Error(`There is an error with status ${response.status}`);
  }
  console.log(stockJson);
  console.log(Object.keys(stockJson));
  console.log(Object.keys(stockJson).length);

  const isEmpty = Object.keys(stockJson).length === 0;

  // Object.keys(stockJson).length === 0
  
  if (stockJson.country == "") {
    console.log(`${symbol.value} is not a valid ticker symbol`);
    throw new Error(`There is an error with status ${stockJson.status}`);
  }
  // if (stockJson.status === 404) {
  //   console.log(`${symbol.value} is not a valid ticker symbol`);
  //   throw new Error(`There is an error with status ${stockJson.status}`);
  // }
  
  return stockJson;
};

const makeRequest2 = async () => {
  let response = await fetch(apiStockQuoteUrl);

  // if the response is bad
  if (!response.ok) {
    throw new Error(`There is an error with status ${response.status}`);
  }
  let usersJson = response.json();
  return usersJson;
};

// const makeRequest = async () => {
//   let stockLogo = await fetch(apiStockLogo);
//   let stockQuote = await fetch(apiStockQuote);

//   // if the response is bad
//   if (!stockLogo.ok) {
//     throw new Error(`There is an error with status ${stockLogo.status}`);
//   }
//   if (!stockQuote.ok) {
//     throw new Error(`There is an error with status ${stockQuote.status}`);
//   }
//   const contentArr = [stockLogo.json(), stockQuote.json()];
//   return contentArr;
// };

const renderStocks = async () => {
  let apiStockLogo = await makeRequest1();
  let apiStockQuote = await makeRequest2();
console.log(apiStockLogo);
console.log(apiStockQuote);

  /* TODO:
1. take symbol and get stock details from API
2. get rid of imgURL in form
3. take data from API and .addItem() instance of StocksController
4.

*/

  // this is where we want to render Stocks

  // Task #10 recommends <{adding a call to the uploadItem function inside the scope of addItem function}>
  jess.addItem(
    apiStockLogo.logo,
    symbol.value,
    apiStockQuote.c,
    jess.currentTime()
  );

  // how to get the id
  // let stockArr = jess.items;
  // console.log(stockArr[0],"++++++++++++++++");

  jess.setLocalStorage();



  /* ================================================
      Saving to the DB
      {symbol.value, apiStockQuote.c, apiStockLogo.logo}
     ================================================ */

  // let dbStockObj = {nameForFirstName: symbol.value, priceForOwner: apiStockQuote.c, urlForAvatar: apiStockLogo.logo};
  // let dbStockObj = {nameForFirstName: symbol.value, priceForAvatar: apiStockQuote.c};

  // Content from Form
  // symbol.value
  // price.value
  // quantity.value
  // holdingId.value

  let stockSaveObj = {name: symbol.value.toUpperCase(), targetPrice: apiStockQuote.c};

  let stockUpdateObj = {id: holdingId.value, name: symbol.value.toUpperCase(), targetPrice: apiStockQuote.c};

  // // putting object in Heroku db
  // jess.save(stockSaveObj);

  // // search Heroku db for stock by name
  // jess.findByName(stockSaveObj.name);

  // // update entry by id
  // jess.update(stockUpdateObj);

  // delete entry by id
  jess.delete(stockUpdateObj);



  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";
  addItemCards();

  symbol.value = "";
  price.value = "";
};

// ================================================
submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

  symbol = document.getElementById("symbol");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  holdingId = document.getElementById("holdingId");

  let apiSymbol = symbol.value.toUpperCase();
  console.log(apiSymbol);

  apiStockLogoUrl =
    "https://finnhub.io/api/v1/stock/profile2?symbol=" +
    apiSymbol +
    "&token=cb85mnqad3i6lui0sl0g";

  apiStockQuoteUrl =
  "https://finnhub.io/api/v1/quote?symbol=" +
  apiSymbol +
  "&token=cb85mnqad3i6lui0sl0g";

  // THIS IS WHERE WE CALL RENDER STOCKS
  renderStocks();
});

// submitBtn.addEventListener("click", renderCards());
