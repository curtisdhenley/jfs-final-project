const makeRequest = async () => {
    // ALPHA VANTAGE
    // let response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=F706BEFDEELKYEV7");
    // let response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=F706BEFDEELKYEV7");
    // let response = await fetch("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=F706BEFDEELKYEV7");
    // let response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=F706BEFDEELKYEV7");

    
    // FINNHUB
    // let response = await fetch("https://finnhub.io/api/v1/search?q=facebook&token=cb85mnqad3i6lui0sl0g");
    // let response = await fetch("https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cb85mnqad3i6lui0sl0g");
    // let response = await fetch("https://finnhub.io/api/v1/news?category=general&token=cb85mnqad3i6lui0sl0g");
    // let response = await fetch("https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2022-07-13&to=2022-07-14&token=cb85mnqad3i6lui0sl0g");
    let response = await fetch("https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=cb85mnqad3i6lui0sl0g");
    // let response = await fetch("https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cb85mnqad3i6lui0sl0g");
    // let response = await fetch("https://finnhub.io/api/v1/news?category=general&token=cb85mnqad3i6lui0sl0g");
    // if the response is bad
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let usersJson = response.json();
    return usersJson;
}

const renderCards = async () => {
    // create DOM element to append my cards too
    let displayUser = document.getElementById("displayUsers");
    // handle promise from the makeRequest function
    let users = await makeRequest();
    // this just makes it so that I can access the array of users directly instead of having to do users.data every time.
    let usersArr = users.data;
    // this forEach() loops through the array and creates a new div element for each user. It then adds a data-id attribute so that I can keep track of who is who. I added some classes to the div for styling purposes.
    usersArr.forEach(user => {
        let userCard = document.createElement("div");
        userCard.setAttribute("data-id", user.id);
        userCard.classList.add("col-3","m-5")
        // Using template literals to inject the user variables where I need them to display in the card
        userCard.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${user.avatar}" class="card-img-top" alt="picture of person">
  <div class="card-body">
    <h3>${user.first_name} ${user.last_name}</h3>
    <p class="card-text">${user.email}</p>
  </div>
</div>`
// last step is to append each userCard that is created to the displayUser element so they will display on the page
    displayUser.appendChild(userCard);

    });

}

// renderCards();
// TODO create method in itemsController to store local items 
makeRequest().then(response => console.log(response));
makeRequest().then(response => localStorage.setItem("stockData", JSON.stringify(response)));

localStorage.setItem("stockData", JSON.stringify(usersJson));



// const bob = new ItemsController();

// bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

// bob.addItem("https://g.foolcdn.com/art/companylogos/mark/MSFT.png", "msft", "23.71", bob.currentTime());

localStorage.setItem("classID2", JSON.stringify(bob.currentID));
localStorage.setItem("stocks2", JSON.stringify(bob.items));
// console.log(storage)

// localStorage.setItem("ransom", "3");

// export {ItemsController};