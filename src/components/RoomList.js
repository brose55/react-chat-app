import React, { Component } from 'react';
import '../style/RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: '',
      display:"none"
    };
    this.hideForm = this.hideForm.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.sort().concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  handleSumbmit(e) {
    e.preventDefault();
    console.log(this.state.rooms);
    if (!this.state.newRoomName) { return }
    this.setState({
      newRoomName: '',

    });
    this.hideForm();
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    })
  }

  hideForm() {
    const newDisplay = this.state.display === 'none' ? 'block' : 'none';
    this.setState({ display: newDisplay });
  }



  render() {
    const rooms = this.state.rooms.sort((a, b) => a.name > b.name)
                                  .map(room => {
                                    return(
                                      <div key={room.key}>
                                        <li
                                          onClick={ () => this.props.handleRoomUpdate(room) }
                                          className="room">
                                          #{room.name.toLowerCase()}
                                        </li>
                                      </div>
                                    )
                                  })

    return (
      <div className="room-list">
        <ul>{ rooms }</ul>
        <button className="new-room-button" onClick={this.hideForm}>New Room</button>
        <form style={{display: this.state.display}} onSubmit={ (e) => this.handleSumbmit(e) }>
          <input
            type="text"
            value={ this.state.newRoomName }
            onChange={ (e) => this.handleChange(e) }
          />
          <button
            type="submit"
            onClick={ () => this.createRoom() }>
              Go
          </button>
        </form>
      </div>
    )
  }
}

export default RoomList;
