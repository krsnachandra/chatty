import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-counter">{this.props.onlineUsers} users are online</div>
      </nav>
    )
  }
}


export default Nav;