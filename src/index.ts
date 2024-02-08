import http from 'node:http';
import { userDelete, userGet, userPost, userPut } from './routes/userRoutes';

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
        response.statusCode = 400;
        response.write('No Response');
        response.end();
    }
  } catch (err) {
    response.statusCode = 500;
    response.write(`Internal Server Error: ${(err as Error).message}`);
    response.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
