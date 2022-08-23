// need to set up export
class UserController {
// TODO: remove OLD code
  constructor(currentId = 0) {
    this._users = [];
    this._currentId = currentId;
  }

  get users() {
    return this._users;
  }

  get currentId() {
    return this._currentId;
  }

  set users(newUser) {
    this._users = newUser;
  }

  set currentId(newValue) {
    this._currentId = newValue;
  }

  // Task #10 recommends <{adding a call to the uploadItem function inside the scope of addItem function}>
  addUser(avatarUrl, firstName, lastName, email) {
    const id = this.currentId;
    const userObj = { avatarUrl, firstName, lastName, email  };
    this.currentId++;
    this.users.push(userObj);
  }

  currentTime() {
    const time = new Date();
    return time;
  }

  setLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.users));
    console.log(`this.currentID ${this.currentId}`);

    localStorage.setItem("userId", JSON.stringify(this.currentId));
  }

  loadLocalStorage() {
    this.users = JSON.parse(localStorage.getItem("user"));
    this.currentID = JSON.parse(localStorage.getItem("userId"));
  }

  // POST
save({ name, targetPrice }) {
  const data = { name, targetPrice };

  fetch("https://peaceful-ocean-58466.herokuapp.com/user/add", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

save({ firstName, lastName, email, avatar }) {
  console.log(` avatar URL: ${avatar}`);
  const data = { firstName, lastName, email, avatar };

  fetch("https://peaceful-ocean-58466.herokuapp.com/user/add", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
  // GET
findByName = async (name) => {
    let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/user/name?name=" + name;
    let response = await fetch(fetchURL);
    let stockJson = await response.json();
    console.log("stockJson", stockJson);
    // console.log(stockJson);
    return stockJson;
}

/* ================================================
      PUT
      Our next area of focus once our API is upgraded
     ================================================ */

// PUT
update({ id, name, targetPrice }) {
  const data = { id, name, targetPrice };
  let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/user/" + id;

  fetch(fetchURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// DELETE
delete( id ) {
  const data = { id };
  console.log(id);
  let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/user/" + id;

  fetch(fetchURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

}

// const bob = new StocksController();

// TODO: remove OLD code
export { UserController };
