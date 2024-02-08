import http from 'node:http';
import { userGet, userPost } from './routes/userRoutes';

const server = http.createServer((request, response) => {
  switch (request.method) {
    case 'GET':
      userGet(request, response);
      break;

    case 'POST':
      userPost(request, response);
      break;

    // case 'PUT':
    //   put(request, response);
    //   break;

    // case 'DELETE':
    //   deleteR(request, response);
    //   break;

    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write('No Response');
      response.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
