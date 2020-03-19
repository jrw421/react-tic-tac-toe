import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';

const Landing = (props) => <Async load = {import('./components/landing.jsx')} componentProps = {props}/>

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        <Route exact path = "/" render = {props => <Landing {...props} history = {this.props.history}></Landing>}></Route>
      </div> 
    );
  }

}

export default withRouter(App);