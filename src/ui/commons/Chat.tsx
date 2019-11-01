import React, {useState} from 'react';
import {Message} from 'src/types/Message';

interface ChatProps {
  messages: Message[];
  onSendMessage: (messageText: string, receiverName: string) => void;
  receiverName: string;
}

const Chat = ({messages, onSendMessage, receiverName}: ChatProps) => {
  const [messageText, setMessageText] = useState('');

  const onSend = (messageText: string, receiverName: string) => {
    setMessageText('');
    onSendMessage(messageText, receiverName);
  }

  return (
    <>
      <div id="header">
        <p id="username">{receiverName}</p>
      </div>
      <div id="messages">
        {messages.map((message) => message.from === receiverName ?
          <p className='message-right'>{message.messageText}</p>
          : <p className='message-left'>{message.messageText}</p>
        )}
      </div>
      <div id="text-box">
        <textarea onChange={(event) => setMessageText(event.target.value)} />
        <button onClick={() => onSend(messageText, receiverName)}>Send</button>
      </div>
    </>
  )
};

export default Chat;