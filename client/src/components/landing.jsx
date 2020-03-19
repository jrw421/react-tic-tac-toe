import React from 'react';
import Board from './Board.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board/>
      </div>
    );
  }
}

export default Landing;