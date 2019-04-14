const http = require('http');
const url = require('url');

function start() {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    console.log('request for' + pathname + 'received');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }
  
  http.createServer(onRequest).listen(7890);
  console.log('server has started');
}

exports.start = start;
