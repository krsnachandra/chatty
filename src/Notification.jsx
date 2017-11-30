import React, {Component} from 'react';

class Notification extends Component {
  render() {
    console.log("Rendering <Notification/>");
    return (
      <div className="message system">
        <span>{this.props.content}</span>
      </div>
    )
  }
}


export default Notification;