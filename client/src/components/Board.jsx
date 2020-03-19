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
        });
    }   

    render() {
        console.log('squares ', this.state.squares, 'turn', this.state.isXturn)
        return (
            <div className="grid">
                {this.state.squares.flatMap((row, i) => {
                    console.log('i ', i)
                    return row.map((value, j) => { return <Square value={value} key={j} takeTurn={this.takeTurn} position={[i, j]}/> }
                )})}
            </div>
        )
    }
}