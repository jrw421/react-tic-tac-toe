const LocalStorageAccess = require('./localStorageFunctions.js')

module.exports = class FetchXO {
    
    // Make constructor accept reference to local storage for basic dependency injection / testing
    constructor(localStorage) {
        this.localStorageAccess = new LocalStorageAccess(localStorage)
    }

    // Mock HTTP Get requests to the specified endpoint.
    get(endpoint) {
        return new Promise((resolve, reject) => {
            let paramData = endpoint.split(':')
            if (paramData.length > 2) {
                reject("404 - Please provide parameters in the appropriate format.")
            } else {
                paramData = paramData[1]
            }
            if (endpoint.includes("/api/turn")) { resolve(this.localStorageAccess.getTurn(paramData)) }
            if (endpoint.includes("/api/game")) { resolve(this.localStorageAccess.getGame(paramData)) }
            if (endpoint.includes("/api/score")) { resolve(this.localStorageAccess.getScore(paramData)) }
            reject("404 - The specified endpoint does not exist.")
        })
    }

    // Mock HTTP Post requests to the specified endpoint.
    post(endpoint, data) {
        return new Promise((resolve, reject) => {
            if (endpoint === "/api/turn") { resolve(this.localStorageAccess.setTurn(data.player)) }
            if (endpoint === "/api/game") { resolve(this.localStorageAccess.makeMove(data.row, data.column, data.player)) }
            if (endpoint === "/api/score") { resolve(this.localStorageAccess.setScore(data.player, data.score)) }
            reject("404 - The specified endpoint does not exist.")
        })
    }
}