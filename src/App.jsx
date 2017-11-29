import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.socket = null;
    // this.state = {messages: []};

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', (msg) => {
      const messages = this.state.messages.concat(JSON.parse(msg.data));
      this.setState({messages});
    })
  }

  onNewMessage(content) { // receives the content from the input in ChatBar
    const messageObj = {
      username: this.state.currentUser.name,
      content: content
    }

    console.log(messageObj)
    // console.log(username);
    this.socket.send(JSON.stringify(messageObj));
  }
  // when receiving content, add to posts array


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar
          currentUser={ this.state.currentUser}
          onMessage={ this.onNewMessage } />
      </div>
    );
  }
}
export default App;
