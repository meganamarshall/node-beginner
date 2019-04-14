const exec = require('child-process').exec;

function start() {
  console.log('request handler "start" was called');
  const content = 'empty';

  exec('ls -lah', function(error, stdout, stderr) {
    content = stdout;
  });

  return content;
}

function upload() {
  console.log('request handler "upload" was called');
  return 'hello upload';
}

exports.start = start;
exports.upload = upload;
