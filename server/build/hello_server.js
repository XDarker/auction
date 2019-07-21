"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const server = http.createServer((request, Response) => {
    Response.end("hello Node!!!");
});
server.listen(8000);
