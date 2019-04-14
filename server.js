const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    let postData = '';
    const pathname = url.parse(request.url).pathname;
    console.log('request for' + pathname + 'received');

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('received post data chunk ' + postDataChunk);
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
  }
  
  http.createServer(onRequest).listen(7890);
  console.log('server has started');
}

exports.start = start;
