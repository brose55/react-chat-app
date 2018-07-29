import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        {
          this.props.user === null ?
            <div>
              <h4>Guest</h4>
              <button onClick={ () => this.handleSignIn() }>Sign In</button>
            </div>
          :
            <div>
              <h4>{this.props.user.displayName}</h4>
              <button onClick={ () => this.handleSignOut() }>Sign Out</button>
            </div>
        }
      </div>
    )
  }
}

export default User;
