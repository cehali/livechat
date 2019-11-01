import WebSocket, {Server} from 'ws';
import {ClientSocket} from './types/ClientSocket';

const port = 9090;
const wss = new Server({port: port});

const startWebsocket = () => {
  let hostSocket: WebSocket;
  let clientSockets: ClientSocket[] = [];

  const sendMessageToClientRecipient = (message: string) => {
    const messageDecoded = JSON.parse(message);
    const [clientRecipient] = clientSockets.filter((clientSocket) => {
      return clientSocket.clientName === messageDecoded.to;
    });
    clientRecipient.socket.send(message);
  }

  wss.on('connection', (ws: WebSocket, req: Request) => {
    if (req.url.replace('/?uuid=', '') === 'host') {
      hostSocket = ws;
    } else {
      const clientName = req.url.replace('/?uuid=', '');
      clientSockets.push({clientName, socket: ws});
      const clientsNames = clientSockets.map(({clientName}) => clientName);
      hostSocket && hostSocket.send(JSON.stringify(clientsNames));
    }
  
    ws.on('message', (message: string) => {
      if (req.url.replace('/?uuid=', '') === 'host') {
        sendMessageToClientRecipient(message);
      } else {
        hostSocket && hostSocket.send(message);
      }
    });

    ws.on('close', () => {
      clientSockets = [];
      console.log('Connection closed');
    });
  });
}



export default startWebsocket;
