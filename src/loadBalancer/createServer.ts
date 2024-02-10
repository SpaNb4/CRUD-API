import 'dotenv/config';
import http from 'node:http';
import { handleMessage } from '../database/db';
import { routes } from '../routes/userRoutes';

export const LOAD_BALANCER_PORT = 4000;

export const createServer = (workerId?: number) => {
  process.on('message', handleMessage);

  const server = http.createServer((request, response) => {
    routes(request, response);
  });

  if (workerId) {
    const port = LOAD_BALANCER_PORT + workerId;
    server.listen(port, () => {
      console.log(`Worker ${process.pid} running at http://localhost:${port}/`);
    });
  } else {
    const port = LOAD_BALANCER_PORT;
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
};
