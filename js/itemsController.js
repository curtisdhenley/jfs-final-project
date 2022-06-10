class ItemsController {
    constructor(currentId=0){
        this._item = [];
        this._currentId = currentId;
    }

    get item(){
        return this._item;
    }

    get currentId() {
        return this._currentId;
    }

    set item(newItem) {
        this._item = newItem;
    }

    set currentId(newValue) {
        this._currentId = newValue;
    }

    addItem(name, description, img, createdAt) {
        this.currentId++
        this.item.push([name, description, img, createdAt])
    }
};

const bob = new ItemsController();


bob.addItem("Apple", "tech company", "abc", "now");
console.log(bob.item);