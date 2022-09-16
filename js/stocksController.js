// need to set up export
class StocksController {
  constructor(currentId = 0) {
    this._items = [];
    this._currentId = currentId;
  }

  get items() {
    return this._items;
  }

  get currentId() {
    return this._currentId;
  }

  set items(newItem) {
    this._items = newItem;
  }

  set currentId(newValue) {
    this._currentId = newValue;
  }

  // Task #10 recommends <{adding a call to the uploadItem function inside the scope of addItem function}>
  addItem(img, symbol, price, updatedAt) {
    const id = this.currentId;
    const itemObj = { id, img, symbol, price, updatedAt };
    this.currentId++;
    this.items.push(itemObj);
  }

  currentTime() {
    const time = new Date();
    return time;
  }

  setLocalStorage() {
    localStorage.setItem("stocks", JSON.stringify(this.items));
    console.log(`this.currentID ${this.currentId}`);

    localStorage.setItem("classID", JSON.stringify(this.currentId));

    // localStorage.setItem("classID", JSON.stringify(bob.currentID));
    // localStorage.setItem("stocks", JSON.stringify(bob.items));
  }

  loadLocalStorage() {
    this.items = JSON.parse(localStorage.getItem("stocks"));
    this.currentID = JSON.parse(localStorage.getItem("classID"));

    // this.gearArray = JSON.parse(localStorage.getItem("gear"));
    // this.currentID = JSON.parse(localStorage.getItem("currentID"));
  }

  // temporarily using Team TABLE for storage, ultimately to use Holding TABLE

  //   save({nameForFirstName, priceForAvatar}){
  //     const data = { name: nameForFirstName,  avatar: priceForAvatar };

  //     fetch('https://peaceful-ocean-58466.herokuapp.com/team/add', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //     console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //     console.error('Error:', error);
  //     });
  // }
  // }

  // POST
  save({ name, targetPrice }) {
    const data = { name, targetPrice };

    fetch("https://peaceful-ocean-58466.herokuapp.com/holding/add", {
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

  // GET all
  findAll = async () => {
    let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding";
    let response = await fetch(fetchURL);
    let stockJson = await response.json();
    console.log("stockJson", stockJson);
    // console.log(stockJson);
    return stockJson;
}

  // GET By Name
  findByName = async (name) => {
    console.log(`name = ${name}`);
    let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding/name?name=" + name;
    let response = await fetch(fetchURL);
    let stockJson = await response.json();
    console.log("stockJson", stockJson);
    return stockJson;
}

/* ================================================
      PUT
      Our next area of focus once our API is upgraded
     ================================================ */

// PUT
update({ id, name, targetPrice }) {
  const data = { id, name, targetPrice };
  let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding/" + id;

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
// deleteById = async (id) => {
//   let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding/" + id;
//   let response = await fetch(fetchURL);
//   let stockJson = await response.json();
//   console.log("deleteById | stockJson", stockJson);
//   return stockJson;
// }

// DELETE
delete({ id, name, targetPrice }) {
  const data = { id, name, targetPrice };
  let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding/" + id;

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

// DELETE BY ID
// currently not in use
deleteById(id) {
  let fetchURL = "https://peaceful-ocean-58466.herokuapp.com/holding/" + id;
  // const data = { id, name, targetPrice };

  fetch(fetchURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  });
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("Success:", data);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
}

} // does this need to be deleted, no closes controller

const bob = new StocksController();

// bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

// bob.addItem("https://g.foolcdn.com/art/companylogos/mark/MSFT.png", "msft", "23.71", bob.currentTime());

export { StocksController };
