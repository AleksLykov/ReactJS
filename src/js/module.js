export class Developer {
    constructor() {
        this.age = 18
        this._name = "John"
    }
    getName() {
        return this._name
    }
    setName(name) {
        this._name = name
    }
}