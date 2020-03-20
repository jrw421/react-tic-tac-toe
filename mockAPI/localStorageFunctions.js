module.exports = class localStorageAccess {

    constructor(localStorage) {
        this.localStorage = localStorage;
    }

    createFreshBoard() {
        return Array(3).fill(null).map(() => new Array(3).fill(null));
    }

    /**
     * Saves a fresh game state to local storage for later retrieval.
     */
    initGame() {
        const freshBoard = this.createFreshBoard();
        this.localStorage.setItem("game", freshBoard);
        return freshBoard;
    }

    /**
     * Retrieves a game state from local storage, initializes one if none exists.
     */
    getGame() {
        const savedGame = this.localStorage.getItem("game");
        if (savedGame) {
            return savedGame;
        } else {
            return this.initGame();
        }
    }

    /**
     * Retrieves the game state from local storage and make the appropriate
     * transformation. Save the new game state to local storage, overwriting 
     * the old game state.
     * 
     * @param {number} row A number representing the index of the row in which the player wishes to mark a move.
     * @param {number} column A number representing the column of a row in which the player wishes to mark a move.
     * @param {string} player The identity of the players - either "X" or "O".
     */
    makeMove(row, column, player) {
        const gameState = this.getGame();
        if (player !== "X" && player !== "O") {
            throw Error("Only players X and O may play this game.");
        } else {
            gameState[row][column] = player;
            this.localStorage.setItem("game", gameState);
        }
    }

    /**
     * Retrieves the identity of the players who's turn it is currently. Either "X" or "O".
     */
    getTurn() {
        return this.localStorage.getItem("turn");
    }

    /**
     * Set the identity of the players who's turn it is currently. 
     * 
     * @param {string} player The identity of the player whos turn it now is.
     */
    setTurn(player) {
        if (player !== "X" && player !== "O") {
            throw Error("Only players X and O may play this game.");
        }
        return this.localStorage.setItem("turn", player);
    }

    /**
     * Retrieves the score of the specified player.
     */
    getScore(player) {
        if (player !== "X" && player !== "O" && player !== "Draw") {
            throw Error("Only players X and O may play this game.");
        }
        return this.localStorage.getItem(player);
    }

    /**
     * Updates the score of the specified player. 
     * 
     * @param {string} player The identity of the player whos turn it now is.
     */
    setScore(player, score) {
        if (player !== "X" && player !== "O" && player !== "Draw") {
            throw Error("Only players X and O may play this game.");   
        }
        return this.localStorage.setItem(player, score);
    }
}