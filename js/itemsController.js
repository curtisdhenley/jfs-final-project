class ItemsController {
    constructor(){
        this._item = [];
    }

    get item(){
        return this._item;
    }
};

const bob = new ItemsController();

console.log(bob.item);