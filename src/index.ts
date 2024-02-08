import 'dotenv/config';
import http from 'node:http';
import { userDelete, userGet, userPost, userPut } from './routes/userRoutes';
import { routeNotFound } from './utils';

const server = http.createServer((request, response) => {
  try {
    switch (request.method) {
      case 'GET':
        userGet(request, response);
        break;

      case 'POST':
        userPost(request, response);
        break;

      case 'PUT':
        userPut(request, response);
        break;

      case 'DELETE':
        userDelete(request, response);
        break;

      default:
        routeNotFound(request, response);
    }
  } catch (err) {
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ message: `Internal Server Error: ${(err as Error).message}` }));
    response.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
