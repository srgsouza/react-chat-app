// ref Jim Haff's code
import React, { Component } from 'react';
import { socket } from '../index'
// import './style.css';
// import ChatRoom from '../ChatRoom';

// Smart Component
export default class ChatBoard extends Component {
  constructor() {
    super();

    this.state = {
      usernames: [],
      messages: [],
      newMessage: '',
    }
  }

  componentDidMount() {
    socket.on('connect', function () {
      console.log('Connected to server');
    });

    socket.on('disconnect', function () {
      console.log('Disconnected from server');
    });

    // set up the listener for the users,
    socket.on('users', (usernames) => {
      this.setState({ usernames: [...usernames]});
    });

    // listen for new messages sent from server
    socket.on('newMessage',  (message) => {
      console.log('## Got New Message');
      
      console.log(message.text);
      this.setState({
        messages: [...this.state.messages, message.text]
      })
    });

  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({
      messages: [...this.state.messages, this.state.newMessage]
    })
    console.log('User is: ', this.props.user);   
    console.log('Messages is :', this.state.newMessage);
    
    socket.emit('createMessage', {
      text: this.state.newMessage
    }, function () {

    });
    this.inputEntry.value = "";  // clears value of input box, referenced bellow
  }

  render() {
    const messagesList = this.state.messages.map((message, i) => {
      return (
        <li>{message}</li>
      )
    })
    return (
      <div className="wrapper">

        <p>Welcome to the chat app</p>       

        <form onSubmit={this.handleSubmit}>
          <input name="newMessage" ref={el => this.inputEntry = el} type="text" onChange={this.handleInputChange} placeholder="Type Message"  />
          <button>Send</button>
        </form>

          {messagesList}
      </div>
    )
  }
}


