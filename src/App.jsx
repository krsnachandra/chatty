import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';

import Nav from './Nav.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.socket = null;
    // this.state = {messages: []};

    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      onlineUsers: 1
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', (msg) => {
      const mess = JSON.parse(msg.data);
      // console.log(mess);
      // console.log('type', mess.type);
      if(mess.type !== 'numberOfUsers') {
        const messages = this.state.messages.concat(JSON.parse(msg.data));
        this.setState({messages});
      } else {
        // const onlineUsers = this.state.onlineUsers.concat(JSON.parse(msg.data));
        this.setState({onlineUsers: mess.content});
        // console.log(this.state.onlineUsers);
      }

    })
  }

  // receives the content from the input in ChatBar
  onNewMessage(content) {
    const messageObj = {
      username: this.state.currentUser.name,
      content,
      type: 'message'
    }
    this.socket.send(JSON.stringify(messageObj));
  }
  // when receiving content, add to posts array

  onUsernameChange(newUsername) {
    const systemMessage = {
      content: `${this.state.currentUser.name} has changed their name to ${newUsername}`,
      type: 'sysMessage'
    }
    this.socket.send(JSON.stringify(systemMessage));
    this.setState({
      currentUser: {name: newUsername}
    })
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Nav onlineUsers={this.state.onlineUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          onMessage={this.onNewMessage}
          onUsernameChange= {this.onUsernameChange} />
      </div>
    );
  }
}
export default App;
