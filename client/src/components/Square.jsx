import React, { Component } from 'react';

export default class Square extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { value } = this.props;
        return (
            <div>
                Square
                {value}
            </div>
        )
    }
}