import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello World
        <div>
          <a href="/component">Link to Component</a>
        </div>
      </div>
    );
  }
}

export default Landing;