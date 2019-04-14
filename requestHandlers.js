const exec = require('child_process').exec;
const fs = require('fs');
const querystring = require('querystring');

function start(response, postData) {
  console.log('request handler "start" was called');

  let body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post">'+
  '<textarea name="text" rows="20" cols="60"></textarea>'+
  '<input type="submit" value="Submit text" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(body);
  response.end();
}

function upload(response, postData) {
  console.log('request handler "upload" was called');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('you\'ve sent' + querystring.parse(postData).text);
  response.end();
}

function show(response) {
  console.log('request handler "show" was called');
  response.writeHead(200, { 'Content-Type': 'image/png' });
  fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
