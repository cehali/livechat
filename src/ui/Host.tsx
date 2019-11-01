import React, {useState, useMemo} from 'react';
import {Message} from 'src/types/Message';
import Chat from './commons/Chat';

const Host = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [clientsNames, setClientsNames] = useState<string[]>([]);

  const connection = useMemo(() => new WebSocket('ws://localhost:9090/?uuid=host'), []);
  
  connection.onerror = (error: Event) => {
    console.error(error);
  };
  connection.onmessage = (event: MessageEvent) => {
    onReceiveMessage(event.data)
  };
  
  const onSendMessage = (messageText: string, receiverName: string) => {
    connection.send(JSON.stringify({from: 'host', to: receiverName, messageText}));
    setCurrentMessages([...currentMessages, {from: 'host', to: receiverName, messageText}]);
  }

  const onReceiveMessage = (dataReceived: string) => {
    const dataDecoded = JSON.parse(dataReceived);
    if (dataDecoded instanceof Array) {
      setClientsNames(dataDecoded);
    } else {
      setCurrentMessages([...currentMessages, dataDecoded]);
    }
  }

  return (
    <div>
      {clientsNames.map((clientName) => {
        return (
          <Chat 
            messages={currentMessages.filter(({from, to}) => (from === clientName && to === 'host') || (to === clientName && from === 'host'))}
            onSendMessage={onSendMessage}
            receiverName={clientName}
          />
        )
      })}
    </div>
  )
};

export default Host;