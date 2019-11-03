import React, {useState, useMemo, useEffect} from 'react';
import axios from 'axios';
import {Message} from 'src/types/Message';
import Chat from './commons/Chat';
import '../styles/host.css';

const Host = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [clientsNames, setClientsNames] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:9090/messages`)
      .then((result) => {
        setCurrentMessages(result.data)
      })
      .catch((error) => console.error(error))
  }, []);

  const connection = useMemo(() => new WebSocket('ws://localhost:9090/?uuid=host'), []);
  
  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data)
  };
  
  const onSendMessage = (messageText: string, receiverName: string) => {
    const messageObject = {from: 'host', to: receiverName.toLowerCase(), messageText};
    axios.post(`http://localhost:9090/messages`, messageObject);
    connection.send(JSON.stringify(messageObject));
    setCurrentMessages([...currentMessages, messageObject]);
  }

  const onReceiveMessage = (dataReceived: string) => {
    const dataDecoded = JSON.parse(dataReceived);
    if (dataDecoded instanceof Array) {
      setClientsNames(dataDecoded);
    } else {
      setCurrentMessages([...currentMessages, dataDecoded]);
    }
  }

  if (clientsNames.length > 0) {
    return (
      <div className="host-window">
        {clientsNames.map((clientName) => {
          return (
            <Chat 
              messages={currentMessages.filter(({from, to}) => 
                (from === clientName && to === 'host') || (to === clientName && from === 'host'))}
              onSendMessage={onSendMessage}
              receiverName={clientName}
            />
          )
        })}
      </div>
    )
  } else {
    return (
      <p><strong>There are not any clients connected</strong></p>
    )
  }

};

export default Host;