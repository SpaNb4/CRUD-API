import 'dotenv/config';
import http from 'node:http';
import { handleMessage } from '../database/db';
import { routes } from '../routes/userRoutes';

export const createServer = (workerId?: number) => {
  process.on('message', handleMessage);

  const server = http.createServer((request, response) => {
    routes(request, response);
  });

  if (workerId) {
    const port = 4000 + workerId;
    server.listen(port, () => {
      console.log(`Worker ${process.pid} running at http://localhost:${port}/`);
    });
  } else {
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
};
