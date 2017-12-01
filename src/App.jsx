import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';

import Nav from './Nav.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.socket = null;

    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      onlineUsers: ''
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', (msg) => {
      const mess = JSON.parse(msg.data);
      if(mess.type !== 'numberOfUsers') {
        const messages = this.state.messages.concat(mess);
        this.setState({messages});
      } else {
        this.setState({onlineUsers: mess.content});
      }

    })
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('Will Update', this.state, nextState);
  // }

  onNewMessage(content) {
    const messageObj = {
      username: this.state.currentUser.name,
      content,
      type: 'message'
    }
    this.socket.send(JSON.stringify(messageObj));
  }

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
