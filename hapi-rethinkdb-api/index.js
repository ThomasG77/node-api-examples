import Hapi from 'hapi';
import config from './config.js';
import handlers from './handlers.js';

const server = new Hapi.Server();

server.connection(config.server);

server.register(handlers, (err) => {
  if (err) throw err;

  server.start(() => {
    if (!config.isTest) {
      console.log('Hapi-RethinkDB TODO API');
      console.log(`Address: ${config.server.host}:${config.server.port}`);
    }
  });
});

export default server;
