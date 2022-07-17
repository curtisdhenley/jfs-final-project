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
}

const bob = new StocksController();

// bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

// bob.addItem("https://g.foolcdn.com/art/companylogos/mark/MSFT.png", "msft", "23.71", bob.currentTime());

export { StocksController };
