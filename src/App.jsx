import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages})
    }, 3000);
  }

  onNewMessage(content) { // receives the content from the input in ChatBar
    console.log(content);
    // I think I need to make this a new message like above...
    const messages = this.state.messages.concat(content);
    this.setState({messages});
    // this.setState({content}).then(() => componentDidMount());
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
