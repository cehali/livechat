import React, {useState} from 'react';
import {Message} from 'src/types/Message';
import '../../styles/chat.css';

interface ChatProps {
  messages: Message[];
  onSendMessage: (messageText: string, receiverName: string) => void;
  receiverName: string;
  clientName?: string;
}

const Chat = ({messages, onSendMessage, receiverName, clientName}: ChatProps) => {
  const [messageText, setMessageText] = useState('');

  const onSend = (messageText: string, receiverName: string) => {
    setMessageText('');
    onSendMessage(messageText, receiverName);
  };

  return (
    <div className="chat-window">
      <p id="username" className="chat-header">{`${clientName || 'Host'} => ${receiverName}`}</p>
      <div className="messages-box">
        {messages.map((message, index) => message.from === receiverName.toLowerCase()
          ? <p className='message message-left' key={index}>{message.messageText}</p>
          : <p className='message message-right' key={index}>{message.messageText}</p>,
        )}
      </div>
      <div className="message-text-box">
        <textarea className="message-text" onChange={(event) => setMessageText(event.target.value)} value={messageText}/>
        <button className="send-btn" onClick={() => onSend(messageText, receiverName)} disabled={!messageText}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
