import React, { Component } from 'react';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <h3>Chatterbox</h3>
          <RoomList firebase={firebase} />
        </div>
        <div className="chat-container">
        </div>
      </div>
    );
  }
}

export default App;
