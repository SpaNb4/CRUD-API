import 'dotenv/config';
import http from 'node:http';
import { routes } from './routes/userRoutes';

export const server = http.createServer((request, response) => {
  routes(request, response);
});

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}
