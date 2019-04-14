const server = require('./server');
const route = require('./router');

server.start(router.route);
