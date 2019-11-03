import WebSocket from 'ws';

export interface ClientSocket {
  clientName: string;
  socket: WebSocket;
}
