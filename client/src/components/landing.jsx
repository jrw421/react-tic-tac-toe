import React from 'react';
import Board from './Board.jsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

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
    localStorage.setItem('Owins', this.state.O);
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Typography class="score" variant="h6">X wins: {this.state.X}</Typography>
          <Typography class="score" variant="h6">O wins: {this.state.O}</Typography>
          <Typography class="title" variant="h6">Tic Tac Toe</Typography>
        </AppBar><br/>
        <Typography class="rules">
          Rules of the game: <br/>
          1. X's start!<br/>
          2. You play until someone wins.<br/>
          3. A player can win when they have three of their symbol in a row - diagonals count.<br/>
        </Typography>
        <Board incrementWin={this.incrementWin}/>
      </div>
    );
  }
}

export default Landing;