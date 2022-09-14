// TODO: OLD code 
import { UserController } from "./userController.js";

const peterUserController = new UserController();

const postBtn = document.getElementById("postBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");

const listItem = document.getElementById("list-items");

const firstNameElement = document.getElementById("first-name");
const lastNameElement = document.getElementById("last-name");
const emailElement = document.getElementById("email");
const avatarUrlElement = document.getElementById("avatar-url");

const email = emailElement.value;
const firstName = firstNameElement.value;
const lastName = lastNameElement.value;
const avatarUrl = avatarUrlElement.value;

const userIdElement = document.getElementById("userId");

let apiStockLogoUrl = "Default API Logo";
let apiStockQuoteUrl = "Default API Quote";


const displayUsers = () => {
  // TODO: change stocks to users in controller
  const userJson = localStorage.getItem("user"); 

  const userArr = JSON.parse(userJson);
  // loop iterates through local storage and rebuilds html to make list of stocks
  for (let i = 0; i < userArr.length; i++) {
    console.log(`i is ${i}`);

    let newRow = document.createElement("tr");
    newRow.setAttribute("id", i);
    newRow.innerHTML += `
        <th scope="row"><img class="img-thumbnail" src="${userArr[i].avatarUrl}" style="height: 50px;"></th>
        <td>${userArr[i].firstName}</td>
        <td>${userArr[i].lastName}</td>
        <td>${userArr[i].email}`;
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

const renderUsers = async () => {

  // Task #10 recommends <{adding a call to the uploadItem function inside the scope of addItem function}>
  peterUserController.addUser(
    avatarUrlElement.value,
    firstNameElement.value,
    lastNameElement.value,
    emailElement.value,
    peterUserController.currentTime()
  );

  peterUserController.setLocalStorage();

  /* ================================================
      Saving to the DB
      {symbol.value, apiStockQuote.c, apiStockLogo.logo}
     ================================================ */
  
  let userSaveObj = {avatar: avatarUrlElement.value, email: emailElement.value, firstName: firstNameElement.value, lastName: lastNameElement.value};
  let userUpdateObj = {id: userIdElement.value, avatar: avatarUrlElement.value, email: emailElement.value, firstName: firstNameElement.value, lastName: lastNameElement.value};
  // putting object in Heroku db
  // jess.save(stockSaveObj);

  // search Heroku db for stock by name
  peterUserController.findByName(stockSaveObj.name);

  // update entry by id
  peterUserController.update(stockUpdateObj);

  // delete entry by id
  // jess.delete(stockUpdateObj);

  // use our function instead of renderListFromLocal();
  listItem.innerHTML = "";
  displayUsers();

  symbol.value = "";
  price.value = "";
};

const addUserToLocalStorage = () => {
  peterUserController.addUser(
    avatarUrlElement.value,
    firstNameElement.value,
    lastNameElement.value,
    emailElement.value,
    peterUserController.currentTime()
  );
}

const clearFormData = () => {
  emailElement.value = "";
  avatarUrlElement.value = "";
  firstNameElement.value = "";
  lastNameElement.value = "";
}

// SAVE USER to database
const postUser = async () => {
  addUserToLocalStorage();
  peterUserController.setLocalStorage();
  let userSaveObj = {avatar: avatarUrlElement.value, email: emailElement.value, firstName: firstNameElement.value, lastName: lastNameElement.value};
  console.log(userSaveObj.avatar);
  peterUserController.save(userSaveObj);
  console.log(userSaveObj);

  listItem.innerHTML = "";
  displayUsers();
  clearFormData();
}

const deleteUser = async () => {
  peterUserController.setLocalStorage();
  let userDeleteObj = {id: userIdElement.value, avatar: avatarUrlElement.value, email: emailElement.value, firstName: firstNameElement.value, lastName: lastNameElement.value};
  console.log(`userUpdateObj ID: ${userDeleteObj.id}`);
  const userToDeleteId = userDeleteObj.id;
  peterUserController.delete(userToDeleteId);

  listItem.innerHTML = "";
  displayUsers();
  clearFormData();
}

const putUser = () => {
  peterUserController.addUser(
    avatarUrlElement.value,
    firstNameElement.value,
    lastNameElement.value,
    emailElement.value,
    peterUserController.currentTime()
  );

  peterUserController.setLocalStorage();
  // email, firstName, lastName, avatar, id 
  let userUpdateObj = { email: emailElement.value, firstName: firstNameElement.value, lastName: lastNameElement.value, avatar: avatarUrlElement.value, id: userIdElement.value};
  console.log(`user update obj: ${userUpdateObj}`);
  peterUserController.update(userUpdateObj);
  console.log(userUpdateObj);

  listItem.innerHTML = "";
  displayUsers();
  clearFormData();
}

const getUserByLastName = () => {
  const lastName = lastNameElement.value;
  peterUserController.findByLastName(lastName);
  console.log(lastName);
  // console log from findByLastName will display list of users with same last name in console
}

// const getByNameStocks = async () => {
//   let apiStockLogo = await makeRequest1();
//   let apiStockQuote = await makeRequest2();
//   console.log(apiStockLogo);
//   console.log(apiStockQuote);

//   jess.addItem(
//     apiStockLogo.logo,
//     symbol.value,
//     apiStockQuote.c,
//     jess.currentTime()
//   );

  // search Heroku db for stock by name
  // jess.findByName(stockSaveObj.name);

  // use our function instead of renderListFromLocal();
//   listItem.innerHTML = "";
//   addItemCards();

//   symbol.value = "";
//   price.value = "";
// };

// deleteBtn
// putBtn
// userId
// postBtn
// ================================================
// submitBtn.addEventListener("click", function (event) {
//   event.preventDefault(); // related to action.php in stock-form.html?+++++++++++

//   apiStockLogoUrl =
//     "https://finnhub.io/api/v1/stock/profile2?symbol=" +
//     apiSymbol +
//     "&token=cb85mnqad3i6lui0sl0g";

//   apiStockQuoteUrl =
//   "https://finnhub.io/api/v1/quote?symbol=" +
//   apiSymbol +
//   "&token=cb85mnqad3i6lui0sl0g";

//   // THIS IS WHERE WE CALL RENDER STOCKS
//   renderUsers();
// });

postBtn.addEventListener("click", function (event) {
  event.preventDefault(); 
  postUser();
});

putBtn.addEventListener("click", function (e) {
  e.preventDefault();
  putUser();
});

deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  deleteUser();
});

findLastNameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getUserByLastName();
})
// submitBtn.addEventListener("click", renderCards());
