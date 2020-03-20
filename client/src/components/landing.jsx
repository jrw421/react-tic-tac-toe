import React from 'react';
import Board from './Board.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X: 0,
      O: 0
    };
    this.incrementWin = this.incrementWin.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  componentDidMount() {
    let XWins = localStorage.getItem('Xwins');
    let OWins = localStorage.getItem('Owins');
    this.setState({
      X: XWins,
      O: OWins
    });
  }

  incrementWin(player) {
    this.setState({
      player: this.state[player]++
    }, this.saveToLocalStorage());
  }

  saveToLocalStorage() {
    localStorage.setItem('Xwins', this.state.X);
    localStorage.setItem('Ywins', this.state.O);
  }

  render() {
    return (
      <div>
        <div>X wins: {this.state.X}</div>
        <div>O wins: {this.state.O}</div>
        <Board incrementWin={this.incrementWin}/>
      </div>
    );
  }
}

export default Landing;