import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import Landing from './components/Landing';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCoER4b0pGoLC8dgZZSAmvaIJ4uVjJdUYY",
  authDomain: "chatterbox-react.firebaseapp.com",
  databaseURL: "https://chatterbox-react.firebaseio.com",
  projectId: "chatterbox-react",
  storageBucket: "chatterbox-react.appspot.com",
  messagingSenderId: "722779105914"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: null
    };
  }

  // update the active room when a user clicks on a room name
  updateActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  // trigger new render after room deletion
  deleteRender(room) {
    this.setState({ activeRoom: '' });
  }

  // set user after sign-in
  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <h3>Chatterbox</h3>
          <User
            firebase = { firebase }
            setUser = { (user) => this.setUser(user) }
            user = { this.state.user }
          />
          <RoomList
            firebase={ firebase }
            handleRoomUpdate = { (room) => this.updateActiveRoom(room) }
            activeRoom = { this.state.activeRoom }
            handleDelete = { (room) => this.deleteRender(room) }
          />
        </div>
        <div className="chat-container">
          {
            // display landing page or messageList
            this.state.activeRoom === '' ?
            <Landing /> :
            <div className="messages-container">
              <MessageList
                firebase={ firebase }
                activeRoom = { this.state.activeRoom }
                user = { this.state.user }
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
