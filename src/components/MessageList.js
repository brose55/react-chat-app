import React, { Component } from 'react';
import '../style/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: '',
      roomId: '',
      user: '',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    return (
      <div className='message-list'>
        <div>
          {
            this.state.messages.map( message => {
              if (message.roomId === this.props.activeRoom.key) {
                return (
                  <div key={ message.key } className="message">
                    <h4 className="username">{message.username}: </h4>
                    <p>{message.content}</p>
                    <footer>sent on: {message.sentAt}</footer>
                 </div>
               )
              }  else {
                return null
              }
            })
          }
        </div>
      </div>
    )
  }
}

export default MessageList;
