import React, { Component } from 'react';

import Message from './Message.jsx';

import Notification from './Notification.jsx';

// class MessageList extends Component {
//   render() {
//     console.log("Rendering <MessageList/>");
//     const messages = this.props.messages.map((message) => {
//       if(message.type === 'sysMessage') {
//         return <Notification
//         key={message.id}
//         content={message.content} />
//       } else {
//         return <Message
//         key={message.id}
//         username={message.username}
//         content={message.content} />
//       }
//     });
//     return (
//       <main className="messages">
//         { messages }
//       </main>
//     );
//   }
// }
function MessageList({messages}){
    console.log("Rendering <MessageList/>");
    const messageComps = messages.map((message) => {
      if(message.type === 'sysMessage') {
        return <Notification
        key={message.id}
        content={message.content} />
      } else {
        return <Message
        key={message.id}
        username={message.username}
        content={message.content} />
      }
    });

    return (
      <main className="messages">
        { messageComps }
      </main>
    );

}
export default MessageList;
