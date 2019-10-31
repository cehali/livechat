import React, {useState, useMemo} from 'react';
import {Message} from 'src/types/Message';

const Client = () => {
  const [messageText, setMessageText] = useState('');
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const connection = useMemo(() => new WebSocket('ws://localhost:9090'), []);

  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data)
  };
  
  const onSendMessage = (messageText: string) => {
    connection.send(JSON.stringify({from: 'test', to: 'host', messageText}));
    setCurrentMessages([...currentMessages, {from: 'test', to: 'host', messageText}]);
  }

  const onReceiveMessage = (messageData: string) => {
    setCurrentMessages([...currentMessages, JSON.parse(messageData)]);
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