import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

const port = process.env.PORT || getPort();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['https://dontbedumb.onrender.com', 'http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);
app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (_, res) => {
  res.status(200).json({ message: 'DontBeDumb backend is running' });
});

app.use('*', (req, res) => {
  console.log(`Received request for ${req.originalUrl}`);
  res.status(404).json({ message: 'Not Found' });
});

console.log('Starting server...');
console.log(`Port: ${port}`);
console.log(`Node environment: ${process.env.NODE_ENV}`);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);

process.on('uncaughtException', (err, origin) => {
  logger.error(`Uncaught Exception at ${origin}: ${err}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
