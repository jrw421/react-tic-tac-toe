const FetchXO = require('./mockAPIAccess.js')
const MockLocalStorage = require('./MockLocalStorage.js')

test('Should initialize a game is none exists', () => {
    const fetchXO = new FetchXO(new MockLocalStorage())
    fetchXO.get("/api/game").then((newGame) => {
        expect(newGame).toStrictEqual(Array(3).fill(null).map(() => new Array(3).fill(null)))
    })
});

test('Should allow the client to get the score', () => {
    const mockLocalStorage = new MockLocalStorage()
    const fetchXO = new FetchXO(mockLocalStorage)
    mockLocalStorage.setItem("X", 1)
    fetchXO.get("/api/score/:X").then((score) => {
        expect(score).toBe(1)
    })
});

test('Should allow the client to set the score', () => {
    const mockLocalStorage = new MockLocalStorage()
    const fetchXO = new FetchXO(mockLocalStorage)
    fetchXO.post("/api/score", { player: "X", score: 1 }).then(async () => {
        const score = mockLocalStorage.getItem("X")
        expect(score).toBe(1)
    })
});

test('Should not reset the game if one already exists', async () => {
    const fetchXO = new FetchXO(new MockLocalStorage())
    await fetchXO.get("/api/game")
    await fetchXO.post("/api/game", { row: 0, column: 2, player: "X" })
    const updatedGame = await fetchXO.get("/api/game")
    expect(updatedGame).toStrictEqual([
        [null, null, "X"],
        [null, null, null],
        [null, null, null],
    ])
});

test('Should allow a player to make a move', async ( ) => {
    const fetchXO = new FetchXO(new MockLocalStorage())
    const oldBoard = await fetchXO.get("/api/game")
    fetchXO.post("/api/game", { row: 1, column: 1, player: "X" }).then(async () => {
        oldBoard[1][1] = "X"
        const newBoard = await fetchXO.get("/api/game")
        expect(newBoard).toStrictEqual(oldBoard)
    })
})
