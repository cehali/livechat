export const config = Object.freeze({
  apiURL: process.env.API_URL || 'http://localhost',
  webSocketURL: process.env.WEBSOCKET_URL || 'localhost',
  port: process.env.PORT || 9090  
});
