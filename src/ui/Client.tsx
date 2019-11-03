import React, {useState, useMemo, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router';
import axios from 'axios';
import Chat from './commons/Chat';
import {Message} from 'src/types/Message';
import {config} from '../config/config';

const Client = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const location = useLocation();
  const history = useHistory();
  const clientName = (location.state && location.state.clientName) || history.replace('/');

  const apiURL = `${config.apiURL}:${config.port}`;
  const webSocketURL = `${config.webSocketURL}:${config.port}`;

  useEffect(() => {
    axios.get(`${apiURL}/messages/${clientName}`)
      .then((result) => {
        setCurrentMessages(result.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const connection = useMemo(() => new WebSocket(`ws://${webSocketURL}/?uuid=${clientName}`), []);

  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data);
  };

  const onSendMessage = (messageText: string, receiverName: string) => {
    const messageObject = {from: clientName, to: receiverName.toLowerCase(), messageText};
    axios.post(`${apiURL}/messages`, messageObject);
    connection.send(JSON.stringify(messageObject));
    setCurrentMessages([...currentMessages, messageObject]);
  };

  const onReceiveMessage = (messageData: string) => {
    setCurrentMessages([...currentMessages, JSON.parse(messageData)]);
  };

  return (
    <Chat
      messages={currentMessages}
      onSendMessage={onSendMessage}
      receiverName='Host'
      clientName={clientName}
    />
  );
};

export default Client;
