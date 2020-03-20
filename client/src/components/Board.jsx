import React, { Component } from 'react';
import Square from './Square.jsx';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill(null).map(() => new Array(3).fill(null)),
            isXturn: true,
            numberOfTurns: 0
        }
        this.takeTurn = this.takeTurn.bind(this);
        this.checkForWin = this.checkForWin.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame() {
        this.setState({
            squares: Array(3).fill(null).map(() => new Array(3).fill(null)),
            numberOfTurns: 0
        });
    }

    // TakeTurn determines the position the player selected and marks the square with the
    // player's mark - either X or O. This mark is updated in the game grid, and 
    // the grid is updated and saved in state. After this update, the game checks for a win.

    takeTurn(positions) {
        let positionX = positions[0];
        let positionY = positions[1];
        let { isXturn } = this.state;
        let move = isXturn ? 'X' : 'O';

        let updatedSquares = this.state.squares.map(row => row.map(val => { return val }));
        updatedSquares[positionX][positionY] === null ? updatedSquares[positionX][positionY] = move : alert('Square is taken! Please choose a different one.');

        this.setState({
            squares: updatedSquares,
            isXturn: !this.state.isXturn,
            numberOfTurns: this.state.numberOfTurns+=1
        }, () => this.checkForWin(positionX, positionY));
    }   

    // Check for win evaluates every possible win a player could have, and is checked after every turn.
    // If a player wins, this data is saved in the parent component and stored in localStorage.

    checkForWin(positionX, positionY, optionalState) {
        let { incrementWin } = this.props;
        let squares = optionalState ? optionalState : this.state.squares;
        let winHorizontally0 = (squares[0][0] !== null) && squares[0][0] === squares[0][1] &&  squares[0][1] === squares[0][2];
        let winHorizontally1 = (squares[1][0] !== null) && squares[1][0] === squares[1][1] &&  squares[1][1] === squares[1][2];
        let winHorizontally2 = (squares[2][0] !== null) && squares[2][0] === squares[2][1] &&  squares[2][1] === squares[2][2];

        let winVertically0 = (squares[0][0] !== null) && squares[0][0] === squares[1][0] &&  squares[1][0] === squares[2][0];
        let winVertically1 = (squares[0][1] !== null) && squares[0][1] === squares[1][1] &&  squares[1][1] === squares[2][1];
        let winVertically2 = (squares[0][2] !== null) && squares[0][2] === squares[1][2] &&  squares[1][2] === squares[2][2];

        let winDiagonally0 = (squares[0][0] !== null) && squares[0][0] === squares[1][1] &&  squares[1][1] === squares[2][2];
        let winDiagonally1 = (squares[0][2] !== null) && squares[0][2] === squares[1][1] &&  squares[1][1] === squares[2][0];
        
        const horizontalWin = winHorizontally1 || winHorizontally2 || winHorizontally0;
        const verticalWin = winVertically1 || winVertically2 || winVertically0;
        const diagonalWin = winDiagonally0 || winDiagonally1;

        if (horizontalWin || verticalWin || diagonalWin) {
            let winner = squares[positionX][positionY];
            alert(`${winner}'s won!`);
            optionalState ? null : incrementWin(winner);
            this.setState({
                squares: Array(3).fill([null, null, null]),
                numberOfTurns: 0
            });
            return true;
        } else if (!horizontalWin && !verticalWin && !diagonalWin && this.state.numberOfTurns === 9) {
            alert(`It's a tie!`);
            incrementWin('Draw');
            this.setState({
                squares: Array(3).fill([null, null, null]),
                numberOfTurns: 0
            });
            return false;
        }
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.resetGame()}>Reset Game</button>
                <div className="grid">
                    {this.state.squares.flatMap((row, i) => {
                        return row.map((value, j) => { return <Square value={value} key={Math.random()} takeTurn={this.takeTurn} position={[i, j]}/> }
                    )})}
                </div>
            </div>
        )
    }
}