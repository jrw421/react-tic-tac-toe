module.exports = class MockLocalStorage {
    constructor() {
        this.getItem = (key) => this[key]
        this.setItem = (key, value) => { 
            this[key] = value 
        }
    }
}
