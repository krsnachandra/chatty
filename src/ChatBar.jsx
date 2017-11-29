import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
    }

    // this.onCompose = this.onCompose.bind(this);
    this.onContent = this.onContent.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder={`${ this.props.currentUser.name }`} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={ this.onContent }
          value={ this.state.content }
          onKeyPress={ this.handleKeyPress } />
      </footer>
    )
  }
}

export default ChatBar;