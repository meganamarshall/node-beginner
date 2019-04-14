const exec = require('child_process').exec;
const fs = require('fs');
const querystring = require('querystring');
const formidable = require('formidable');

function start(response, postData) {
  console.log('request handler "start" was called');

  let body = /*html*/
  `<html>
  <head>
  <meta http-equiv='Content-Type' content='text/html'
  charset=UTF-8' />
  </head>
  <body>
  <form action='/upload' method='post'>
  <input type='file' name='upload'>
  <input type='submit' value='upload file' />
  </form>
  </body>
  </html>`;

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log('request handler "upload" was called');

  const form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done');

    fs.rename(files.upload.path, '/tmp/test.png', function(error) {
      if(error) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('received image: <br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show(response) {
  console.log('request handler "show" was called');
  response.writeHead(200, { 'Content-Type': 'image/png' });
  fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
