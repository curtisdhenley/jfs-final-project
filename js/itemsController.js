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

    addItem(name, description, img, createdAt) {
        const id = this.currentId;
        const itemObj = {id, name, description, img, createdAt}
        this.currentId++
        this.items.push(itemObj)
    }
};

const bob = new ItemsController();


bob.addItem("Apple", "tech company", "abc", "now");

bob.addItem("Microsoft", "tech company", "abc", "now");
console.log(bob.items);
