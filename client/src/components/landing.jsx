import React from 'react';
import Board from './Board.jsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import FetchXO from '../../../mockAPI/mockAPIAccess.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X: 0,
      O: 0,
      Draw: 0
    };
    this.incrementWin = this.incrementWin.bind(this);
    this.FetchXO = new FetchXO(localStorage);
  }

  componentDidMount() {
    this.FetchXO.get('/api/score/:X')
      .then(data => 
        this.setState({
          X: data
      }))
      .catch(err => console.log('error ', err))

    this.FetchXO.get('/api/score/:O')
      .then(data => this.setState({
        O: data
    }))
    .catch(err => console.log('error ', err))

    this.FetchXO.get('/api/score/:Draw')
      .then(data => this.setState({
        Draw: data
    }))
    .catch(err => console.log('error ', err))
  }

  incrementWin(player) {
    this.setState({
      player: this.state[player]++
    }, () => {
      const payload = { player: player, score: this.state[player]}
      this.FetchXO.post(`/api/score`, payload)
      .then(() => console.log('success'))
      .catch(err => console.log('error ', err))
    });
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Typography class="score" variant="h6">X wins: {this.state.X}</Typography>
          <Typography class="score" variant="h6">O wins: {this.state.O}</Typography>
          <Typography class="score" variant="h6">Draws: {this.state.Draw}</Typography>
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