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

let headerRowCheckbox = document.getElementById("headerRowCheckbox");
let anyCheckbox = document.querySelectorAll(".body-row-checkbox");

let symbol = "Default symbol";
let price = "Default price";
let quantity = "Default quantity";
let holdingId = "Default holding ID";
let apiStockLogoUrl = "Default API Logo";
let apiStockQuoteUrl = "Default API Quote";

// object to hold ids of table rows with checked/unchecked boxes
let checkedBoxesObj = {};

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

    // console.log(`stocksDbId`);
    // console.log(stocksDbId);

    // console.log(`apiStockLogoUrl`);
    // console.log(apiStockLogoUrl);

    // console.log(`apiStockQuoteUrl`);
    // console.log(apiStockQuoteUrl);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row">
          <div class="form-check">
            <input class="form-check-input body-row-checkbox" type="checkbox" value="" id="checkbox${stocksDbId}">
          </div>
        </th>
        <td><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></td>
        <td>${stocksDbName}</td>
        <td>${stocksDbTargetPrice}</td>
        
        <td>${apiStockQuoteUrl.c}</td> <!-- get from 3rd party API-->
        
        <td>quantity</td> <!-- get from our API-->`;
    listItem.appendChild(newRow);
  }

  // V V V V V V V V V V V V V V V V V V V V V V
  // try creating dynamic event listeners
  // don't forget to do find by name too <<< <<<
  // dynamicCheckboxEvents();

  // [Explainer] now that the table of stocks is done being rendered dynamicCheckboxEvents is called to set event listeners for the checkboxes in each row
  setTimeout(() => {
    dynamicCheckboxEvents();
  }, 3000);

  console.log(`anyCheckbox after dynamicCheckboxEvents called`);
  console.log(anyCheckbox);

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

    console.log(`apiStockLogoUrl`);
    console.log(apiStockLogoUrl);

    console.log(`apiStockQuoteUrl`);
    console.log(apiStockQuoteUrl);

    // <input class="form-check-input body-row-checkbox" type="checkbox" value="" id="flexCheckDefault">
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row">
          <div class="form-check">
          <input class="form-check-input body-row-checkbox" type="checkbox" value="" id="checkbox${stocksDbId}">
          </div>
        </th>
        <td><img class="img-thumbnail" src="${apiStockLogoUrl.logo}" style="height: 50px;"></td>
        <td>${stocksDbName}</td>
        <td>${stocksDbTargetPrice}</td>
        
        <td>${apiStockQuoteUrl.c}</td> <!-- get from 3rd party API-->
        
        <td>quantity</td> <!-- get from our API-->`;
    listItem.appendChild(newRow);
  }

  // create event listeners
  setTimeout(() => {
    dynamicCheckboxEvents();
  }, 3000);

  console.log(`anyCheckbox called within findByName`);
  console.log(anyCheckbox);

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

  // make sure header row checkbox reflects what's checked in table
  refreshCheckboxes();
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

  // make sure header row checkbox reflects what's checked in table
  refreshCheckboxes();
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

  // make sure header row checkbox reflects what's checked in table
  refreshCheckboxes();
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

  // make sure header row checkbox is correctly checked
  // setTimeout(() => {
  //   refreshCheckboxes();
  // }, 1500);

  refreshCheckboxes();
});



/* ================================================
    Update Checkbox Statuses Object
   ================================================ */

   // function getCheckboxStatuses(){
const getCheckboxStatuses = async () => {
    // get a list of everything in the DB
    let stocksDbArr = await jess.findAll();
    let highestDbId = stocksDbArr[stocksDbArr.length - 1].id;
    let dbItemCount = 0;
    let checkboxToQuery = 0;
    let checkboxStatus = 0;
  

    console.log(`highestDbId = ${highestDbId}`);
  
    for (let i = 4; i <= highestDbId; i += 10) {
      checkboxToQuery = "#checkbox" + i;
      console.log(`Line 487`);
      console.log(`checkboxToQuery = ${checkboxToQuery}`);
  
      checkboxStatus = document.querySelector(checkboxToQuery);
  
      console.log(`checkboxStatus = ${checkboxStatus.checked}`);

      // V V Do we get here on GET by name V V 
      console.log(`Line 494`);
  
      // do we need to check if the checkboxstatus is also not empty? 
      if (checkboxStatus != null) {
        checkedBoxesObj[i] = checkboxStatus.checked;
      }
      console.log("line 500");
    }
    console.log("Checked box obj");
    console.log(checkedBoxesObj);
    console.log(`dbItemCount = ${dbItemCount}`);

}

/* ================================================
    Delete by Checkbox
   ================================================ */

function deleteStocksByCheckbox() {

  for (let [key, value] of Object.entries(checkedBoxesObj)) {
    console.log(`key, value = ${key}, ${value}`);

    if (value) {
      jess.deleteById(key);
    }
  }

  // is listItem needed
  listItem.innerHTML = "";

  // delayed
  setTimeout(() => {
    displayStocks();
  }, 2000);

};

// ================================================
deleteBtn.addEventListener("click", function (event) {
  event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

  symbol = document.getElementById("symbol");
  price = document.getElementById("price");
  quantity = document.getElementById("quantity");
  holdingId = document.getElementById("holdingId");

  // THIS IS WHERE WE CALL deleteStocks
  console.log("DELETE BUTTON PUSHED");

  deleteStocksByCheckbox();

  // make sure header row checkbox reflects what's checked in table
  refreshCheckboxes();
});

function refreshCheckboxes() {
  let checkboxesNodeList = document.querySelectorAll('input[type="checkbox"]');

  const checkboxesArr = Array.from(checkboxesNodeList);

  console.log(`checkboxesArr`);
  console.log(checkboxesArr);

  // [Explainer] .shift removes the first item in checkboxesArr because it's the header row
  checkboxesArr.shift();

  let maxPossibleBoxesChecked = checkboxesArr.length;
  let numOfCheckedBoxes = 0;

  for (let i = 0; i < checkboxesArr.length; i++) {
    if (checkboxesArr[i].checked) {
      numOfCheckedBoxes++;
    }
  }

  console.log(`numOfCheckedBoxes = ${numOfCheckedBoxes}`);
  console.log(`maxPossibleBoxesChecked = ${maxPossibleBoxesChecked}`);

  // code for setting the dashed header row checkbox
  if (numOfCheckedBoxes == 0) {
    headerRowCheckbox.checked = false;
    headerRowCheckbox.indeterminate = false;
    console.log(`numOfCheckedBoxes == 0 SO headerRowCheckbox.checked = false`);
  } else if (numOfCheckedBoxes == maxPossibleBoxesChecked) {
    headerRowCheckbox.indeterminate = false;
    headerRowCheckbox.checked = true;
    console.log(`numOfCheckedBoxes == max SO headerRowCheckbox.checked = true`);
  } else {
    headerRowCheckbox.checked = false;
    headerRowCheckbox.indeterminate = true;
    console.log(`numOfCheckedBoxes between 0 and max SO headerRowCheckbox.indeterminate = true`);
  }
}

// changing all checkboxes to match the state of the main checkbox
function selectAllToggle() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  console.log(`checkboxes`);
  console.log(checkboxes);

  if (headerRowCheckbox.checked) {
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = true;
      }
    }
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = false;
      }
    }
  }
}

// [Explainer] this function is making event listeners for all of the dynamically generated checkboxes that are created as the table of stocks is rendered 
function dynamicCheckboxEvents(){

  // anyCheckbox is updated one last time to make sure all rows in the table have had the opportunity to be drawn
  anyCheckbox = document.querySelectorAll(".body-row-checkbox");

  console.log(`Inside dynamicCheckboxEvents`);

  // console.log to check what's in anyCheckbox
  console.log(`anyCheckbox within dynamicCheckboxEvents`);
  console.log(anyCheckbox);

  anyCheckbox.forEach((box) => {

    console.log("anyCheckbox.forEach RUNNING");  
    
    box.addEventListener("click", function handleClick(event) {
      console.log("box clicked", event);
  
      // This code comes from getCheckboxStatuses
      getCheckboxStatuses();      
      console.log(`checkedBoxesObj`);
      console.log(checkedBoxesObj);
  
      // calling refreshCheckboxes to assure header row checkbox is correctly checked
      setTimeout(() => {
        refreshCheckboxes();
      }, 1000);
    });
  });

}

headerRowCheckbox.addEventListener("click", function (event) {
  selectAllToggle();

  // make sure header row checkbox is correctly checked
  setTimeout(() => {
    refreshCheckboxes();
  }, 1000);
});