import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((request:IncomingMessage, response: ServerResponse) => {
    console.log('пришёл запрос');
    console.log(request);
    console.log(response);
});

server.listen(3000)