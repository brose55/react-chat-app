import React, { Component } from 'react';
import '../style/RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: '',
      display:"none",
    };
    this.hideForm = this.hideForm.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  // adds firebase data to state
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  handleSumbmit(e) {
    e.preventDefault();
    this.createRoom()
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

  deleteRoom(roomKey) {
        const room = this.props.firebase.database().ref('/rooms/' + roomKey);
        room.remove();
        const remainingRooms = this.state.rooms.filter(room => room.key !== roomKey);
        this.setState({ rooms: remainingRooms });
        this.props.handleRoomUpdate('');
    }

	alphabetize(a, b) {
	  const roomA = a.props.children[0].props.children[1];
	  const roomB = b.props.children[0].props.children[1];
	  let comparison = 0;
	  if (roomA > roomB) {
	    comparison = 1;
	  } else if (roomA < roomB) {
	    comparison = -1;
	  }
	  return comparison;
	}

  render() {
    const rooms = this.state.rooms.map(room => {
                                    return (
                                      <div key={room.key}>
                                        <li
                                          onClick={ () => this.props.handleRoomUpdate(room) }
                                          className="room">
                                          #{room.name.toLowerCase()}
                                        </li>
                                        <button
                                          onClick={ () => {
                                            this.deleteRoom(room.key);
                                          }}>X</button>
                                      </div>
                                    )
                                  });
		rooms.sort(this.alphabetize)

    return (
      <div className="room-list">
        <ul>{ rooms }</ul>
        <button className="new-room-button" onClick={this.hideForm}>New Room</button>
        <form
          style={{display: this.state.display}}
          onSubmit={(e) => this.handleSumbmit(e)}>
          <input
            type="text"
            value={ this.state.newRoomName }
            onChange={ (e) => this.handleChange(e) }
          />
          <button type="submit">Go</button>
        </form>
      </div>
    )
  }
}

export default RoomList;
