import React, { Component} from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div>
          <p>Welcome to Chatterbox! Please sign in using Google or continue as a Guest</p>
          <p>Start a new conversation on the left, or see what people are already talking about...</p>
        </div>
      </div>
    )
  }
}

export default Landing;
