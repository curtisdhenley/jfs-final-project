

/* ================================================
    To Do List
    2022.09.05
   ================================================ */

// 1> user inputs stocks too fast and system breaks, only shows null data in DB

// 2> using get all on an empty DB breaks the system, case must be prevented

import { StocksController } from "../js/stocksController.js";

const jess = new StocksController();

// let submitBtn = document.getElementById("submitBtn");
let postBtn = document.getElementById("postBtn");
let putBtn = document.getElementById("putBtn");
let getByNameBtn = document.getElementById("getByNameBtn");
let getAllBtn = document.getElementById("getAllBtn");
let listItem = document.getElementById("list-items");
let symbol = "Default symbol";
let price = "Default price";
let quantity = "Default quantity";
let holdingId = "Default holding ID";
let apiStockLogoUrl = "Default API Logo";
let apiStockQuoteUrl = "Default API Quote";

/* ================================================
    Old  Print Method
   ================================================ */

// how do names of items in local storage differ from those in DB

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
        <th scope="row"><img class="img-thumbnail" src="${
          stocksArr[i].img
        }" style="height: 50px;"></th>
        <td>${stocksArr[i].symbol.toUpperCase()}</td>
        <td>${stocksArr[i].price}</td>`;
    listItem.appendChild(newRow);
  }
};

/* ================================================
    New Print Method
   ================================================ */

// ****** we need to do 3rd party API calls for innerHTML

// needed to make method async and put an await on jess.findAll in order for FOR loop based on stocksDbArr.length to work
const displayStocks = async () => {
  const stocksJSON = localStorage.getItem("stocks");
  const stocksLocalArr = JSON.parse(stocksJSON);

  const stocksDbArr = await jess.findAll();

  /*
  LOCAL STORAGE CONTENT
img: "https://static2.finnhub.io..."
price: 108.55
symbol: "goog"
 */
  console.log(`stocksLocalArr`);
  console.log(stocksLocalArr);

  /*
  DATABASE CONTENT
name: "S"
targetPrice: 23.9201
 */
  console.log(`stocksDbArr`);
  console.log(stocksDbArr);

  // loop iterates through array of stocks returned from database
  for (let i = 0; i < stocksDbArr.length; i++) {
    // console.log(`i is ${i}`);

    let stocksDbName = stocksDbArr[i].name;
    let stocksDbTargetPrice = stocksDbArr[i].targetPrice;
    // console.log(`stocksDbName is ${stocksDbName}`);
    // console.log(`stocksDbTargetPrice is ${stocksDbTargetPrice}`);

    let apiStockLogoUrlRequest =
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
      stocksDbName +
      "&token=cb85mnqad3i6lui0sl0g";
    let apiStockLogoUrlResponse = await fetch(apiStockLogoUrlRequest);

    let apiStockLogoUrl = await apiStockLogoUrlResponse.json();

    let apiStockQuoteUrlRequest =
      "https://finnhub.io/api/v1/quote?symbol=" +
      stocksDbName +
      "&token=cb85mnqad3i6lui0sl0g";
    let apiStockQuoteUrlResponse = await fetch(apiStockQuoteUrlRequest);

    let apiStockQuoteUrl = await apiStockQuoteUrlResponse.json();

      // console.log(`apiStockLogoUrl is ${apiStockLogoUrl}`);
      // console.log(`apiStockQuoteUrl is ${apiStockQuoteUrl}`);

      console.log(`apiStockLogoUrl`);
      console.log(apiStockLogoUrl);

      console.log(`apiStockQuoteUrl`);
      console.log(apiStockQuoteUrl);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row"><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></th> <!-- get from 3rd party API-->
        <td>${stocksDbName}</td>
        <td>${stocksDbTargetPrice}</td>
        
        <td>${apiStockQuoteUrl.c}</td> <!-- get from 3rd party API-->
        
        <td>quantity</td> <!-- get from our API-->`;
    listItem.appendChild(newRow);
  }
};

/* ================================================
    New Print Method for findByName
   ================================================ */

// ****** we need to do 3rd party API calls for innerHTML

// needed to make method async and put an await on jess.findAll in order for FOR loop based on stocksDbArr.length to work
const displayStocksByName = async () => {
  const stocksJSON = localStorage.getItem("stocks");
  const stocksLocalArr = JSON.parse(stocksJSON);

  const stocksDbArr = await jess.findByName(symbol.value);

  /*
  LOCAL STORAGE CONTENT
img: "https://static2.finnhub.io..."
price: 108.55
symbol: "goog"
 */
  console.log(`stocksLocalArr`);
  console.log(stocksLocalArr);

  /*
  DATABASE CONTENT
name: "S"
targetPrice: 23.9201
 */
  console.log(`stocksDbArr`);
  console.log(stocksDbArr);

  // loop iterates through array of stocks returned from database
  for (let i = 0; i < stocksDbArr.length; i++) {

    let stocksDbName = stocksDbArr[i].name;
    let stocksDbTargetPrice = stocksDbArr[i].targetPrice;

    let apiStockLogoUrlRequest =
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
      stocksDbName +
      "&token=cb85mnqad3i6lui0sl0g";
    let apiStockLogoUrlResponse = await fetch(apiStockLogoUrlRequest);

    let apiStockLogoUrl = await apiStockLogoUrlResponse.json();

    let apiStockQuoteUrlRequest =
      "https://finnhub.io/api/v1/quote?symbol=" +
      stocksDbName +
      "&token=cb85mnqad3i6lui0sl0g";
    let apiStockQuoteUrlResponse = await fetch(apiStockQuoteUrlRequest);

    let apiStockQuoteUrl = await apiStockQuoteUrlResponse.json();

      console.log(`apiStockLogoUrl`);
      console.log(apiStockLogoUrl);

      console.log(`apiStockQuoteUrl`);
      console.log(apiStockQuoteUrl);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row"><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></th> <!-- get from 3rd party API-->
        <td>${stocksDbName}</td>
        <td>${stocksDbTargetPrice}</td>
        
        <td>${apiStockQuoteUrl.c}</td> <!-- get from 3rd party API-->
        
        <td>quantity</td> <!-- get from our API-->`;
    listItem.appendChild(newRow);
  }
};



/* ================================================ */

const makeRequest1 = async () => {
  console.log(`post >> makeRequest1`);
  let response = await fetch(apiStockLogoUrl);
  let stockJson = response.json();

  // if the response is bad
  if (!response.ok) {
    console.log(`${symbol.value} is not a valid ticker symbol`);
    throw new Error(`There is an error with status ${response.status}`);
  }

  const isEmpty = Object.keys(stockJson).length === 0;

  if (stockJson.country == "") {
    console.log(`${symbol.value} is not a valid ticker symbol`);
    throw new Error(`There is an error with status ${stockJson.status}`);
  }

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


/* ================================================
    Post Stocks
   ================================================ */

const postStocks = async () => {
  let apiStockLogo = await makeRequest1();
  let apiStockQuote = await makeRequest2();
  console.log(apiStockLogo);
  console.log(apiStockQuote);

  // 1> add stock to array of stocks held in class instance
  jess.addItem(
    apiStockLogo.logo,
    symbol.value,
    apiStockQuote.c,
    jess.currentTime()
  );

  // 2> save updated array to local storage
  jess.setLocalStorage();

  // 3> put name and target price in object to be saved to DB
  // old object
  let stockSaveObj = {
    name: symbol.value.toUpperCase(),
    targetPrice: price.value, // get from UI
  };

  // new object
  // let stockSaveObj = {img: apiStockLogo.logo, name: symbol.value.toUpperCase(), targetPrice: price.value, quotePrice: apiStockQuote.c, quantity: quantity.value};

  // 4> putting object in Heroku DB
  jess.save(stockSaveObj);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // old print to screen
  // addItemCards();
  
  // normal
  // displayStocks();

  // delayed
  setTimeout(() => { displayStocks(); }, 1000);

  symbol.value = "";
  price.value = "";
};

// ================================================
postBtn.addEventListener("click", function (event) {
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

  // THIS IS WHERE WE CALL postStocks
  postStocks();
});

/* ================================================
    Put Stocks
   ================================================ */

const putStocks = async () => {
  let apiStockLogo = await makeRequest1();
  let apiStockQuote = await makeRequest2();
  // console.log(apiStockLogo);
  // console.log(apiStockQuote);

  // jess.addItem(
  //   apiStockLogo.logo,
  //   symbol.value,
  //   apiStockQuote.c,
  //   jess.currentTime()
  // );

  console.log(`apiStockLogo.logo ${apiStockLogo.logo}`);
  console.log(`symbol.value ${symbol.value}`);
  console.log(`apiStockQuote.c ${apiStockQuote.c}`);

  jess.setLocalStorage();

  let stockUpdateObj = {
    id: holdingId.value,
    name: symbol.value.toUpperCase(),
    targetPrice: price.value,
  };

  // update entry by id
  jess.update(stockUpdateObj);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // normal
  // displayStocks();

  // delayed
  setTimeout(() => { displayStocks(); }, 1000);

  symbol.value = "";
  price.value = "";
};

// ================================================
putBtn.addEventListener("click", function (event) {
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

  // THIS IS WHERE WE CALL postStocks
  putStocks();
});

/* ================================================
   Get All
   ================================================ */

   const getAllStocks = async () => {
    // let apiStockLogo = await makeRequest1();
    // let apiStockQuote = await makeRequest2();
    // console.log(apiStockLogo);
    // console.log(apiStockQuote);
  
    // // 1> add stock to array of stocks held in class instance
    // jess.addItem(
    //   apiStockLogo.logo,
    //   symbol.value,
    //   apiStockQuote.c,
    //   jess.currentTime()
    // );
  
    // // 2> save updated array to local storage
    // jess.setLocalStorage();
  
    // // 3> put name and target price in object to be saved to DB
    // // old object
    // let stockSaveObj = {
    //   name: symbol.value.toUpperCase(),
    //   targetPrice: price.value, // get from UI
    // };
  
    // 4> calling findAll
    jess.findAll();

  
    // use our function instead of renderListFromLocal();
    listItem.innerHTML = "";
    
    // normal
    displayStocks();
  
    // delayed
    // setTimeout(() => { displayStocks(); }, 5000);
  
    symbol.value = "";
    price.value = "";
  };
  
  // ================================================
  getAllBtn.addEventListener("click", function (event) {
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
  
    // THIS IS WHERE WE CALL getAllStocks
    getAllStocks();
  });  

/* ================================================
    Get Stocks by Name
   ================================================ */

   // a lot of the code in this method can be removed

const getByNameStocks = async () => {
  let apiStockLogo = await makeRequest1();
  let apiStockQuote = await makeRequest2();
  console.log(apiStockLogo);
  console.log(apiStockQuote);

  jess.addItem(
    apiStockLogo.logo,
    symbol.value,
    apiStockQuote.c,
    jess.currentTime()
  );

  jess.setLocalStorage();

  let stockSaveObj = {
    name: symbol.value.toUpperCase(),
    targetPrice: apiStockQuote.c,
  };

  // search Heroku db for stock by name
  jess.findByName(stockSaveObj.name);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // old print to screen
  // addItemCards();
  
  // normal
  displayStocksByName();

  symbol.value = "";
  price.value = "";
};

// ================================================
getByNameBtn.addEventListener("click", function (event) {
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

  // THIS IS WHERE WE CALL postStocks
  getByNameStocks();
});

/* ================================================
    Delete by ID
   ================================================ */

const deleteStocks = async () => {
  let apiStockLogo = await makeRequest1();
  let apiStockQuote = await makeRequest2();
  console.log(apiStockLogo);
  console.log(apiStockQuote);

  jess.setLocalStorage();

  let stockDeleteObj = {
    id: holdingId.value,
    name: symbol.value.toUpperCase(),
    targetPrice: apiStockQuote.c,
  };

  // delete entry by id
  jess.delete(stockDeleteObj);

  // // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // old print to screen
  // addItemCards();
  
  // normal
  // displayStocks();

  // delayed
  setTimeout(() => { displayStocks(); }, 1000);

  // symbol.value = "";
  // price.value = "";
};

// ================================================
deleteBtn.addEventListener("click", function (event) {
  event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

  symbol = document.getElementById("symbol");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  holdingId = document.getElementById("holdingId");

  // THIS IS WHERE WE CALL deleteStocks

  deleteStocks();
});
