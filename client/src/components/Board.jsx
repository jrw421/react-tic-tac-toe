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
        updatedSquares[positionX][positionY] = move;

        this.setState({
            squares: updatedSquares,
            isXturn: !this.state.isXturn,
            numberOfTurns: this.state.numberOfTurns+=1
        }, () => this.checkForWin(positionX, positionY));
    }   

    // Check for win evaluates every possible win a player could have, and is checked after every turn.
    // If a player wins, this data is saved in the parent component and stored in localStorage.

    checkForWin(positionX, positionY) {
        let { incrementWin } = this.props;
        let winHorizontally0 = (this.state.squares[0][0] !== null) && this.state.squares[0][0] === this.state.squares[0][1] &&  this.state.squares[0][1] === this.state.squares[0][2];
        let winHorizontally1 = (this.state.squares[1][0] !== null) && this.state.squares[1][0] === this.state.squares[1][1] &&  this.state.squares[1][1] === this.state.squares[1][2];
        let winHorizontally2 = (this.state.squares[2][0] !== null) && this.state.squares[2][0] === this.state.squares[2][1] &&  this.state.squares[2][1] === this.state.squares[2][2];

        let winVertically0 = (this.state.squares[0][0] !== null) && this.state.squares[0][0] === this.state.squares[1][0] &&  this.state.squares[1][0] === this.state.squares[2][0];
        let winVertically1 = (this.state.squares[0][1] !== null) && this.state.squares[0][1] === this.state.squares[1][1] &&  this.state.squares[1][1] === this.state.squares[2][1];
        let winVertically2 = (this.state.squares[0][2] !== null) && this.state.squares[0][2] === this.state.squares[1][2] &&  this.state.squares[1][2] === this.state.squares[2][2];

        let winDiagonally0 = (this.state.squares[0][0] !== null) && this.state.squares[0][0] === this.state.squares[1][1] &&  this.state.squares[1][1] === this.state.squares[2][2];
        let winDiagonally1 = (this.state.squares[0][2] !== null) && this.state.squares[0][2] === this.state.squares[1][1] &&  this.state.squares[1][1] === this.state.squares[2][0];
        
        const horizontalWin = winHorizontally1 || winHorizontally2 || winHorizontally0;
        const verticalWin = winVertically1 || winVertically2 || winVertically0;
        const diagonalWin = winDiagonally0 || winDiagonally1;

        if (horizontalWin || verticalWin || diagonalWin) {
            let winner = this.state.squares[positionX][positionY];
            alert(`${winner}'s won!`);
            incrementWin(winner);
            this.setState({
                squares: Array(3).fill([null, null, null])
            });
        } else if (!horizontalWin && !verticalWin && !diagonalWin && this.state.numberOfTurns === 9) {
            alert(`It's a tie!`);
            this.setState({
                squares: Array(3).fill([null, null, null])
            });
        }
    }

    render() {
        return (
            <div className="grid">
                {this.state.squares.flatMap((row, i) => {
                    return row.map((value, j) => { return <Square value={value} key={Math.random()} takeTurn={this.takeTurn} position={[i, j]}/> }
                )})}
            </div>
        )
    }
}