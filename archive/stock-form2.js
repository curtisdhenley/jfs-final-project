import { StocksController } from "../js/stocksController.js";

const jess = new StocksController();

let submitBtn = document.getElementById("submitBtn");
let listItem = document.getElementById("list-items");
let symbol = "Default symbol";
let price = "Default price";
let apiCall = "Default API Call";

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
        <td>${stocksArr[i].symbol}</td>
        <td>${stocksArr[i].price}</td>`;
    listItem.appendChild(newRow);
  }
};

const makeRequest = async () => {
  let response = await fetch(apiCall);

  // if the response is bad
  if (!response.ok) {
    throw new Error(`There is an error with status ${response.status}`);
  }
  let usersJson = response.json();
  return usersJson;
};

const renderStocks = async () => {
  let stockOverview = await makeRequest();
  console.log(stockOverview);

  /* TODO:
1. take symbol and get stock details from API
2. get rid of imgURL in form
3. take data from API and .addItem() instance of StocksController
4.

*/

  // this is where we want to render Stocks

  jess.addItem(stockOverview.logo, symbol.value, price.value, jess.currentTime());

  // how to get the id
  // let stockArr = jess.items;
  // console.log(stockArr[0],"++++++++++++++++");

  jess.setLocalStorage();

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
  let apiSymbol = symbol.value;
  
  apiCall =
    "https://finnhub.io/api/v1/stock/profile2?symbol=" +
    apiSymbol +
    "&token=cb85mnqad3i6lui0sl0g";

  // THIS IS WHERE WE CALL RENDER STOCKS
  renderStocks();
});

// submitBtn.addEventListener("click", renderCards());
