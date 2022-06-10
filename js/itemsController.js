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

    addItem(symbol, price, updatedAt) {
        const id = this.currentId;
        const itemObj = {id, symbol, price, updatedAt}
        this.currentId++
        this.items.push(itemObj)
    };

    currentTime(){
        const time = new Date();
        return time;
    }
}

const bob = new ItemsController();

bob.addItem("appl", "1734.42", bob.currentTime());

bob.addItem("msft", "23.71", bob.currentTime());
// console.log(bob.items[0]);

localStorage.setItem("classID", JSON.stringify(bob.currentID));
localStorage.setItem("stocks", JSON.stringify(bob.items));
// console.log(storage)

// localStorage.setItem("ransom", "3");
