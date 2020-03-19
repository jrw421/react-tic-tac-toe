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

    takeTurn(position) {
        let { isXturn } = this.state;
    }

    render() {
        console.log('squares ', this.state.squares)
        return (
            <div className="grid">
                {this.state.squares.flatMap(row => {
                    return row.map(value => { return <Square value={value} key={value}/> }
                )})}
            </div>
        )
    }
}