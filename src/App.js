import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      activeRoom: ''
    };
  }

  updateActiveRoom(room) {
    console.log('Room update', this.state.activeRoom.name);
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <h3>Chatterbox</h3>
          <RoomList
            firebase={firebase}
            handleRoomUpdate = { (room) => this.updateActiveRoom(room) }
            activeRoom = { this.state.activeRoom }
          />
        </div>
        <div className="chat-container">
          <MessageList
            firebase={firebase}
            handleRoomUpdate = { (room) => this.updateActiveRoom(room) }
            activeRoom = { this.state.activeRoom }
          />
        </div>
      </div>
    )
  }
}

export default App;
