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
    this.resetScore = this.resetScore.bind(this);
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

  resetScore() {
    this.FetchXO.post('/api/score', {
        player: "X",
        score: 0
    }).then(() => {
        this.FetchXO.post('/api/score', {
            player: "O",
            score: 0
        }).then(() => {
          this.FetchXO.post('/api/score', {
            player: "Draw",
            score: 0
          }).then(() => {
            this.setState({
              X: 0, 
              O: 0,
              Draw: 0
            });
          })
        })
    })
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
        <div style={{maxHeight: '70%'}}>
          <AppBar position="static">
            <div className="wrapper">
              <div className="score">
                <Typography class="state" variant="h4">X wins: {this.state.X}</Typography>
                <Typography class="state" variant="h4">O wins: {this.state.O}</Typography>
                <Typography class="state" variant="h4">Draws: {this.state.Draw}</Typography>
              </div>
              <Typography class="title" variant="h6">Tic Tac Toe</Typography>
            </div>
          </AppBar>
        </div><br/>
        <Typography class="rules">
          Rules of the game: <br/>
          1. X's start!<br/>
          2. You play until someone wins.<br/>
          3. A player can win when they have three of their symbol in a row - diagonals count.<br/>
        </Typography>
        <Board resetScore = { this.resetScore } fetch = { this.FetchXO } incrementWin={ this.incrementWin }/>
      </div>
    );
  }
}

export default Landing;