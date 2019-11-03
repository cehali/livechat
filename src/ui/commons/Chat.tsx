import React, {useState} from 'react';
import {Message} from 'src/types/Message';
import '../../styles/chat.css';

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
    <div className="chat-window">
      <p id="username" className="chat-header">{receiverName}</p>
      <div className="messages-box">
        {messages.map((message) => message.from === receiverName.toLowerCase() ?
          <p className='message message-left'>{message.messageText}</p>
          : <p className='message message-right'>{message.messageText}</p>
        )}
      </div>
      <div className="message-text-box">
        <textarea className="message-text" onChange={(event) => setMessageText(event.target.value)} />
        <button className="send-btn" onClick={() => onSend(messageText, receiverName)} disabled={!messageText}>Send</button>
      </div>
    </div>
  )
};

export default Chat;