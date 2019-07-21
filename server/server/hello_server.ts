import * as http from 'http'
import { request } from 'https';

const server = http.createServer((request, Response) => {
    Response.end("hello Node!!!")
});

server.listen(8000);