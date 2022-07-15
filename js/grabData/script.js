const makeRequest = async () => {
  // ALPHA VANTAGE
  // let response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=F706BEFDEELKYEV7");
  // let response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=F706BEFDEELKYEV7");
  // let response = await fetch("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=F706BEFDEELKYEV7");
  // let response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=F706BEFDEELKYEV7");

  // FINNHUB
  // let response = await fetch("https://finnhub.io/api/v1/search?q=facebook&token=cb85mnqad3i6lui0sl0g");
  let response = await fetch("https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cb85mnqad3i6lui0sl0g");
  // let response = await fetch("https://finnhub.io/api/v1/news?category=general&token=cb85mnqad3i6lui0sl0g");
  // let response = await fetch("https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2022-07-13&to=2022-07-14&token=cb85mnqad3i6lui0sl0g");
  // let response = await fetch("https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=cb85mnqad3i6lui0sl0g");
  // let response = await fetch("https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cb85mnqad3i6lui0sl0g");
  // let response = await fetch("https://finnhub.io/api/v1/news?category=general&token=cb85mnqad3i6lui0sl0g");
  // if the response is bad
  if (!response.ok) {
    throw new Error(`There is an error with status ${response.status}`);
  }
  let usersJson = response.json();
  return usersJson;
};

const renderCards = async () => {
  // create DOM element to append my cards too
  let displayUser = document.getElementById("displayUsers");
  // handle promise from the makeRequest function
  let stockOverview = await makeRequest();

  // this just makes it so that I can access the array of users directly instead of having to do users.data every time.
  // let stockObj = stockOverview.data;

  console.log("Console logging our object");
  console.log(stockOverview);
//   console.log(JSON.stringify(stockOverview));


  let stockCard = document.createElement("div");
  // need to generate an id
  stockCard.setAttribute("data-id", stockOverview.phone);
  stockCard.classList.add("col-3", "m-5");
  stockCard.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${stockOverview.logo}" class="card-img-top" alt="picture of person">
  <div class="card-body">
    <h3>${stockOverview.name} ${stockOverview.ticker}</h3>
    <p class="card-text">${stockOverview.weburl}</p>
  </div>
</div>`;

  displayUser.appendChild(stockCard);
};

renderCards();
// TODO create method in itemsController to store local items
makeRequest().then((response) => console.log(response));
makeRequest().then((response) =>
  localStorage.setItem("stockData", JSON.stringify(response))
);