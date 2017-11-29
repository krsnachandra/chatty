import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      content: '',
      error: '',
      }

    // this.onCompose = this.onCompose.bind(this);
    this.onContent = this.onContent.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // onCompose(event) {
  //   this.setState((prev, props) => ({
  //     content: '',
  //     error: '',
  //   }));
  // }

  // passed to onChange, puts the content in the 'this.state.content'
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleKeyPress = (event) => { // like Karl's onPost
    const state = {
      error: ''
    };
    if(event.key == 'Enter'){
      console.log('enter press here! ')
      this.props.onMessage(this.state.content);
      // now that the content is sent to onNewMessage in App.jsx,
      // we can then clear state.content
      state.content = '';

    }
    this.setState(state);
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={`${ this.props.currentUser.name }`} />
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