import React, {useState, useMemo} from 'react';
import {useLocation} from 'react-router';
import {Message} from 'src/types/Message';
import Chat from './commons/Chat';

const Client = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const location = useLocation();
  const clientName = location.state && location.state.clientName

  const connection = useMemo(() => new WebSocket(`ws://localhost:9090/?uuid=${clientName}`), []);

  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data)
  };
  
  const onSendMessage = (messageText: string, receiverName: string) => {
    connection.send(JSON.stringify({from: clientName, to: receiverName.toLowerCase(), messageText}));
    setCurrentMessages([...currentMessages, {from: clientName, to: receiverName.toLowerCase(), messageText}]);
  }

  const onReceiveMessage = (messageData: string) => {
    setCurrentMessages([...currentMessages, JSON.parse(messageData)]);
  }
  
  return (
    <Chat
      messages={currentMessages}
      onSendMessage={onSendMessage}
      receiverName='Host'
    />
  )
};

export default Client;