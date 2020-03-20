import React, { Component } from 'react';
import Square from './Square.jsx';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill([null, null, null]),
            isXturn: true
        }
        this.takeTurn = this.takeTurn.bind(this);
        this.checkForWin = this.checkForWin.bind(this);
    }

    takeTurn(positions) {
        let positionX = positions[0];
        let positionY = positions[1];
        let { isXturn } = this.state;
        let move = isXturn ? 'X' : 'O';

        let updatedSquares = this.state.squares.map(row => row.map(val => { return val }));
        updatedSquares[positionX][positionY] = move;

        this.setState({
            squares: updatedSquares,
            isXturn: !this.state.isXturn
        }, () => this.checkForWin(positionX, positionY));
    }   

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
            alert(`${winner}'s won!`)
            incrementWin(winner);
            this.setState({
                squares: Array(3).fill([null, null, null])
            })
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