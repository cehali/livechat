import React, {useState, useMemo, useEffect} from 'react';
import {useLocation} from 'react-router';
import axios from 'axios';
import {Message} from 'src/types/Message';
import Chat from './commons/Chat';

const Client = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const location = useLocation();
  const clientName = location.state && location.state.clientName
  
  useEffect(() => {
    axios.get(`http://localhost:9090/messages/${clientName}`)
      .then((result) => {
        setCurrentMessages(result.data)
      })
      .catch((error) => console.error(error))
  }, []);

  const connection = useMemo(() => new WebSocket(`ws://localhost:9090/?uuid=${clientName}`), []);

  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data)
  };
  
  const onSendMessage = (messageText: string, receiverName: string) => {
    const messageObject = {from: clientName, to: receiverName.toLowerCase(), messageText};
    axios.post(`http://localhost:9090/messages`, messageObject);
    connection.send(JSON.stringify(messageObject));
    setCurrentMessages([...currentMessages, messageObject]);
  }

  const onReceiveMessage = (messageData: string) => {
    setCurrentMessages([...currentMessages, JSON.parse(messageData)]);
  }
  
  return (
    <Chat
      messages={currentMessages}
      onSendMessage={onSendMessage}
      receiverName='Host'
      clientName={clientName}
    />
  )
};

export default Client;