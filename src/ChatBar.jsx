import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      newUsername: props.currentUser.name
    }

    this.onContent = this.onContent.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onUsername = this.onUsername.bind(this);

  }

  // passed to onChange, puts the content in the 'this.state.content'
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleKeyPress = (event) => { // like Karl's onPost
    if(event.key == 'Enter'){
      this.props.onMessage(this.state.content);
      // now that the content is sent to onNewMessage in App.jsx,
      // we can then clear state.content
      this.setState({ content: '' });
    }

  }

  onUsername(event) {
    this.setState({
      newUsername: event.target.value
    });
  }

  handleUsernameKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.onUsernameChange(this.state.newUsername);
    }

  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Enter a username"
          value={this.state.newUsername}
          onChange={this.onUsername}
          onKeyPress={this.handleUsernameKeyPress}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.onContent}
          onKeyPress={this.handleKeyPress} />
      </footer>
    )
  }
}

export default ChatBar;