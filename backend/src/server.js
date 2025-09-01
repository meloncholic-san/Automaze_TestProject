import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors'
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { WebSocketServer } from 'ws';
import http from 'http';


let wss;
export async function setupServer() {
  const app = express();
  const PORT = getEnvVar("PORT", 3000);
  const server = http.createServer(app);


  app.use(cors({
    origin: ['http://localhost:5173', 'https://automazetestproject2.vercel.app'],
    credentials: true
  }));


  app.use('/api', routes);

  app.use('', notFoundHandler);
  app.use(errorHandler);

  wss = new WebSocketServer({ server });
  wss.on('connection', ws => {
    console.log('✅ WS client connected');
    ws.on('close', () => console.log('❌ WS client disconnected'));
  });


  server.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });

  
  return { app, server, wss };
}

export function getWSS() {
  return wss;
}