import WebSocket, {Server} from 'ws';
import {Message} from './types/Message';

const port = 9090;
const wss = new Server({port: port});

const startWebsocket = () => {
  wss.on('connection', function(ws: WebSocket) {
    ws.on('message', (message: string) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Connection closed');
    });
  });
}

export default startWebsocket;
