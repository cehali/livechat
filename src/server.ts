import WebSocket, {Server} from 'ws';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import {ClientSocket} from './types/ClientSocket';
import {MongoClient} from 'mongodb';

const startWebsocket = (server: Server) => {
  let hostSocket: WebSocket;
  let clientsSockets: ClientSocket[] = [];

  const sendMessageToClientRecipient = (message: string) => {
    const messageDecoded = JSON.parse(message);
    const [clientRecipient] = clientsSockets.filter((clientSocket) => clientSocket.clientName === messageDecoded.to);
    clientRecipient.socket.send(message);
  };

  const getClientsNames = () => clientsSockets.map(({clientName}) => clientName);

  server.on('connection', (ws: WebSocket, req: Request) => {
    if (req.url.replace('/?uuid=', '') === 'host') {
      hostSocket = ws;
      hostSocket.send(JSON.stringify(getClientsNames()));
    } else {
      const clientName = req.url.replace('/?uuid=', '');
      clientsSockets.push({clientName, socket: ws});
      hostSocket && hostSocket.send(JSON.stringify(getClientsNames()));
    }

    ws.on('message', (message: string) => {
      if (req.url.replace('/?uuid=', '') === 'host') {
        sendMessageToClientRecipient(message);
      } else {
        hostSocket && hostSocket.send(message);
      }
    });

    ws.on('close', () => {
      if (req.url.replace('/?uuid=', '') !== 'host') {
        const clientName = req.url.replace('/?uuid=', '');
        clientsSockets = clientsSockets.filter((clientSocket) => clientSocket.clientName !== clientName);
        hostSocket && hostSocket.send(JSON.stringify(getClientsNames()));
        console.log('Connection closed');
      }
    });
  });
};

const startServer = async (): Promise<() => void> => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  const server = http.createServer(app);
  const wss = new Server({server});
  startWebsocket(wss);
  const url = `mongodb://${process.env.MONGO_URL || 'localhost:27017'}`;
  const mongoClient = await MongoClient.connect(url, {useUnifiedTopology: true});
  const mongoDb = mongoClient.db('livechat');

  app.post('/messages', (req) => {
    mongoDb.collection('messages').insertOne(req.body);
  });

  app.get('/messages/', async (_, res) => {
    const result = await mongoDb.collection('messages').find().toArray();
    res.send(result);
  });

  app.get('/messages/:clientName', async (req, res) => {
    const result = await mongoDb.collection('messages').find({
      $or: [{from: req.params.clientName}, {to: req.params.clientName}],
    }).toArray();
    res.send(result);
  });

  const port = process.env.PORT || 9090;
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  const stopServer = () => {
    server.close();
    mongoClient.close();
  };

  return stopServer;
};

export default startServer;
