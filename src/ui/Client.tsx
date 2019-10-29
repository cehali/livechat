import React, {useState} from 'react';
import {Message} from 'src/types/Message';

interface ClientProps {
  messages?: Message[]
}

const DummyData: Message[] = [{
  from: 'test',
  to: 'host',
  messageText: 'hii'
},
{
  from: 'host',
  to: 'test',
  messageText: 'hii too'
}];

const Client = ({messages = DummyData}: ClientProps) => {
  const [messageText, setMessageText] = useState('');
  const [currentMessages, setCurrentMessages] = useState(messages);
  
  const onSendMessage = (messageText: string) => {
    setCurrentMessages([...currentMessages, {from: 'test', to: 'host', messageText}]);
  }

  return (
    <>
      <div id="header">
        <p id="username">Test</p>
      </div>
      <div id="messages">
        {currentMessages.map((message) => message.from === 'test' ?
            <p className='message-right'>{message.messageText}</p>
            : <p className='message-left'>{message.messageText}</p>
        )}
      </div>
      <div id="text-box">
        <textarea onChange={(event) => setMessageText(event.target.value)} />
        <button onClick={() => onSendMessage(messageText)}>Send</button>
      </div>
    </>
  )
};

export default Client;