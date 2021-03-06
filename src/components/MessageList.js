import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import '../style/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: '',
      roomId: '',
      username: '',
      sentAt: '',
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.orderByChild('sentAt').equalTo('this.state.sentAt')
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e){
    this.setState({
      content: e.target.value,
      roomId: this.props.activeRoom,
      username: this.props.user,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  }

  handleSumbmit(e) {
    e.preventDefault();
    if (!this.state.content) {return}
    this.setState({
      content: '',
      roomId: '',
      username: '',
      sentAt: ''
    })
    this.createMessage();
  }

  createMessage() {
    const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName;
    this.messagesRef.push({
      content: this.state.content,
      roomId: this.props.activeRoom.key,
      username: currentUser,
      sentAt: this.state.sentAt
    });
  }

  deleteMessage(messageKey) {
        const message = this.props.firebase.database().ref('/messages/' + messageKey);
        message.remove();
        const remainingMessages = this.state.messages.filter(message => message.key !== messageKey);
        this.setState({ messages: remainingMessages});
    }


  render() {
    const timeNow = <Moment format="MM/DD/YY"></Moment>;
    const roomMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key)
                                            .map(message => {

                                              // formats timestamp
                                              let notToday = moment(message.sentAt).isBefore(timeNow);
                                              const sentToday = <Moment fromNow>{ message.sentAt }</Moment>;
                                              const sentBefore = <Moment format="HH:mm">{ message.sentAt }</Moment>;

                                              let timeSent;
                                              notToday ? timeSent = sentToday : timeSent = sentBefore;

                                              return (
                                                <div key={ message.key } className="message">
                                                  <h4 className="username">{ message.username }: </h4>
																									<button classname="delete-message transparent" onClick={() => this.deleteMessage(message.key)}>X</button>
                                                  <p>{message.content}</p>
                                                  <footer>
                                                    <p>sent{notToday ? ":" : " at:"} {timeSent}</p>
                                                  </footer>
                                                </div>
                                              )
                                            });

    return (
      <div className="message-list">
        <h1 className="room-name">#{this.props.activeRoom.name.toLowerCase()}</h1>
        <div className="messages">{roomMessages}</div>
        <form className="create-new-message" onSubmit={ (e) => this.handleSumbmit(e) }>
          <input
            type="text"
            placeholder="say something interesting..."
            value={this.state.content}
            onChange={ (e) => this.handleChange(e) }
						className="new-message room-input"
          />
          <button className="transparent" type="sumbit">Send</button>
        </form>
      </div>
    )
  }
}

export default MessageList;
