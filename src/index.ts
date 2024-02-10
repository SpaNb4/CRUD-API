import 'dotenv/config';
import http from 'node:http';
import { routes } from './routes/userRoutes';

const server = http.createServer((request, response) => {
  routes(request, response);
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
