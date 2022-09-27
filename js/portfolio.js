/* ================================================
    To Do List
    2022.09.05
   ================================================ */

// 1> user inputs stocks too fast and system breaks, only shows null data in DB

// 2> using get all on an empty DB breaks the system, case must be prevented

import { StocksController } from "./stocksController.js";

const jess = new StocksController();

// let submitBtn = document.getElementById("submitBtn");
let postBtn = document.getElementById("postBtn");
let putBtn = document.getElementById("putBtn");
let getByNameBtn = document.getElementById("getByNameBtn");
let getAllBtn = document.getElementById("getAllBtn");
let deleteByIdBtn = document.getElementById("deleteByIdBtn");
// will deleteBtn work if table is not yet drawn?
let deleteBtn = document.getElementById("deleteBtn");
let listItem = document.getElementById("list-items");
let symbol = "Default symbol";
let price = "Default price";
let quantity = "Default quantity";
let holdingId = "Default holding ID";
let apiStockLogoUrl = "Default API Logo";
let apiStockQuoteUrl = "Default API Quote";

/* ================================================
    Display Stocks in Table Method
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
    let stocksDbId = stocksDbArr[i].id;
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

    console.log(`stocksDbId`);
    console.log(stocksDbId);

    console.log(`apiStockLogoUrl`);
    console.log(apiStockLogoUrl);

    console.log(`apiStockQuoteUrl`);
    console.log(apiStockQuoteUrl);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="checkbox${stocksDbId}">
          </div>
        </th>
        <td><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></td>
        <td>${stocksDbName}</td>
        <td>${stocksDbTargetPrice}</td>
        
        <td>${apiStockQuoteUrl.c}</td> <!-- get from 3rd party API-->
        
        <td>quantity</td> <!-- get from our API-->`;
    listItem.appendChild(newRow);
  }

  /* Temporary Block BEGIN

  let lastRow = document.createElement("tr");
  lastRow.innerHTML += `
    <input
      type="submit"
      id="deleteBtn"
      value="Delete"
    />`;
  listItem.appendChild(lastRow);

  // setting deleteBtn again since button has just be drawn
  deleteBtn = document.getElementById("deleteBtn");

  Temporary Block END */

  let firstListItem = listItem[0];

  console.log(`listItem`);
  console.log(firstListItem);

  const isChecked = document.querySelector("#checkbox4");

  console.log(`isChecked`);
  console.log(isChecked);

};

/* ================================================
    Display Stocks in Table Method for findByName
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
        <th scope="row">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          </div>
        </th>
        <td><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></td>
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

  // 4> putting object in Heroku DB
  jess.save(stockSaveObj);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // delay so DB has time to update before it's queried to have its contents printed to the screen
  setTimeout(() => {
    displayStocks();
  }, 1000);

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
  let stockUpdateObj = {
    id: holdingId.value,
    name: symbol.value.toUpperCase(),
    targetPrice: price.value,
  };

  // update entry by id
  jess.update(stockUpdateObj);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // delayed >>> explain why delayed <<<
  setTimeout(() => {
    displayStocks();
  }, 1000);
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
  jess.findAll();

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // no delay required
  displayStocks();
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
  // search Heroku db for stock by name
  jess.findByName(symbol.value.toUpperCase());

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // normal
  displayStocksByName();
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

const deleteStocksById = async () => {
  // delete entry by id
  jess.deleteById(holdingId.value);

  // // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // delayed
  setTimeout(() => {
    displayStocks();
  }, 1000);
};

// ================================================
deleteByIdBtn.addEventListener("click", function (event) {
  event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

  symbol = document.getElementById("symbol");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  holdingId = document.getElementById("holdingId");

  // THIS IS WHERE WE CALL deleteStocks

  deleteStocksById();
});

/* ================================================
    Delete by Checkbox
   ================================================ */

const deleteStocksByCheckbox = async () => {

  // let isChecked = document.querySelector("#checkbox24");

  // console.log(`isChecked STATUS`);
  // console.log(isChecked.checked);

  // if (isChecked.checked){
  //   // delete first row of table
  //   jess.deleteById(24);
  // }

  // iterating checkboxes
  let stocksDbArr = await jess.findAll();
  let highestDbId = stocksDbArr[stocksDbArr.length-1].id;
  let dbItemCount = 0;
  let checkboxToQuery = 0;
  let isChecked = 0;
  let checkboxToDelete = 0;

  // Do we need an object to hold the checkboxes' status?
  let checkedBoxesObj = {};

  console.log(`highestDbId = ${highestDbId}`);

  for (let i = 4; i <= highestDbId; i+=10) {
    checkboxToQuery = "#checkbox"+i;

    console.log(`checkboxToQuery = ${checkboxToQuery}`);

    isChecked = document.querySelector(checkboxToQuery);

    // console.log(`isChecked.checked = ${isChecked.checked}`);
    console.log(`isChecked = ${isChecked}`);

    if(isChecked !=  null){
      checkedBoxesObj[i] = isChecked.checked;
    }
    
  }

  console.log(`dbItemCount = ${dbItemCount}`);

  console.log(`checkedBoxesObj`);
  console.log(checkedBoxesObj);


  for (let [key, value] of Object.entries(checkedBoxesObj)) {

    console.log(`key, value = ${key}, ${value}`);

    // checkboxToDelete = "#checkbox"+key;

    // console.log(`checkboxToDelete = ${checkboxToDelete}`);
    
    if (value) {

      jess.deleteById(key);

   }
}

  



  /* Temporary Block BEGIN


  // we need an array that has all of the IDs of the items/rows that are checked
  // let stockId= event.target.getAttribute("data-id");

  // array for checked boxes
  let checkedBoxesArr = [];

  // ideas
  let checkboxId = "No checkbox";
  let checkboxStatus = "No DOM element";   

  // for loop to add items to array

  // >>> how do we know when to end the loop? <<<

  // loop iterates through array of stocks returned from database
  for (let i = 0; i < stocksDbArr.length; i++) {

    checkboxId = "#checkbox"+i;

    // checkboxStatus = document.getElementById(checkboxId);
    // checkboxStatus.value;



    //const js = document.querySelector('#checkbox4');

     const js = document.querySelector(checkboxId);

        console.log(`js.checked`);
        console.log(js.checked);

  }

  // delete entry by id
  jess.deleteById(holdingId.value);


  Temporary Block END */



  // // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";

  // delayed
  setTimeout(() => {
    displayStocks();
  }, 2000);

  // doing await instead of delay
  // await displayStocks();
};

// ================================================
deleteBtn.addEventListener("click", function (event) {
  event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

  symbol = document.getElementById("symbol");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  holdingId = document.getElementById("holdingId");

  // THIS IS WHERE WE CALL deleteStocks
  console.log("DELETE BUTTON PUSHED")

  deleteStocksByCheckbox();
});
