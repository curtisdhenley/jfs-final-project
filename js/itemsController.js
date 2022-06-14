// need to set up export
class ItemsController {
    constructor(currentId=0){
        this._items = [];
        this._currentId = currentId;
    }

    get items(){
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
        const itemObj = {id, img, symbol, price, updatedAt}
        this.currentId++
        this.items.push(itemObj)
    };

    currentTime(){
        const time = new Date();
        return time;
    }
}

const bob = new ItemsController();

bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

bob.addItem("https://g.foolcdn.com/art/companylogos/mark/MSFT.png", "msft", "23.71", bob.currentTime());
// console.log(bob.items[0]);

localStorage.setItem("classID", JSON.stringify(bob.currentID));
localStorage.setItem("stocks", JSON.stringify(bob.items));
// console.log(storage)

// localStorage.setItem("ransom", "3");

export {ItemsController};