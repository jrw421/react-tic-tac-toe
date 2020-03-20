import React, { Component } from 'react';

export default class Square extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { value, position, takeTurn } = this.props;
        return (
            <div onClick={() => takeTurn(position)} className="square">
                <div className="value">{value}</div>
                {/* <div>{position}</div> */}
            </div>
        )
    }
}